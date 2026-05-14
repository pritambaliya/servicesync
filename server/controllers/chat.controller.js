import Chat from "../model/chat.model.js";

const sendMessage = async (
  req,
  res
) => {
  try {

    const { chatId } = req.params;

    const { text } = req.body;

    const chat = await Chat.findById(
      chatId
    );

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    chat.messages.push({
      sender: req.user._id,
      senderModel: req.user.role,
      text,
    });

    await chat.save();

    res.json({
      success: true,
      data: chat,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

const getChat = async (
  req,
  res
) => {
  try {

    const { bookingId } = req.params;

    const chat = await Chat.findOne({
      booking: bookingId,
    })
    .populate(
      "customer",
      "name profileImage"
    )
    .populate(
      "provider",
      "name profileImage"
    );

    res.json({
      success: true,
      data: chat,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export {sendMessage, getChat}; 

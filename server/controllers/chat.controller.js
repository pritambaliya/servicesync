import Chat from "../model/chat.model.js";
import Booking from "../model/booking.model.js";

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

// const getChat = async (
//   req,
//   res
// ) => {
//   try {

//     const { bookingId } = req.params;
//     console.log("Booking ID:", bookingId);
//     const chat = await Chat.findOne({
//       booking: bookingId,
//     })

    
//     .populate(
//       "customer",
//       "name profileImage"
//     )
//     .populate(
//       "provider",
//       "name profileImage"
//     );
//     console.log("Chat Found:", chat)
//     res.json({
//       success: true,
//       data: chat,
//     });

//   } catch (err) {

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });

//   }
// };

const getChat = async (req, res) => {
  try {
    const { bookingId } = req.params;

    let chat = await Chat.findOne({
      booking: bookingId,
    });

    if (!chat) {
      const booking = await Booking.findById(bookingId);

      chat = await Chat.create({
        booking: booking._id,
        customer: booking.customer,
        provider: booking.provider,
        messages: [],
      });
    }
    await chat.populate([
    { path: "customer", select: "name profileImage" },
    { path: "provider", select: "name profileImage" },
      ]);

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

const deleteMessage = async (
  req,
  res
) => {
  const { messageId } = req.params;

  const chat = await Chat.findOne({
    "messages._id": messageId,
  });

  if (!chat) {
    return res.status(404).json({
      success: false,
    });
  }

  chat.messages =
    chat.messages.filter(
      (m) =>
        m._id.toString() !== messageId
    );

  await chat.save();

  res.json({
    success: true,
  });
};

export {sendMessage, getChat, deleteMessage}; 

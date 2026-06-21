import Chat from "../model/chat.model.js";
import Booking from "../model/booking.model.js";

const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // FIX: Create message with proper structure and get the _id before saving
    const newMessage = {
      sender: req.user._id,
      senderModel: req.user.role,
      text,
      createdAt: new Date(),
    };

    chat.messages.push(newMessage);
    
    // FIX: Save and get the saved message with its _id
    await chat.save();
    
    // FIX: Get the newly created message (with _id)
    const savedMessage = chat.messages[chat.messages.length - 1];

    // FIX: Emit to socket - send the message to ALL users in the chat (including sender)
    // You need to import your socket instance here
    if (global.io) {
      global.io.to(chatId).emit("receive_message", {
        _id: savedMessage._id.toString(),
        sender: savedMessage.sender.toString(),
        text: savedMessage.text,
        createdAt: savedMessage.createdAt.toISOString(),
        seen: false,
      });
    }

    res.json({
      success: true,
      data: {
        _id: savedMessage._id.toString(),
        sender: savedMessage.sender.toString(),
        text: savedMessage.text,
        createdAt: savedMessage.createdAt.toISOString(),
        seen: false,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getChat = async (req, res) => {
  try {
    const { bookingId } = req.params;

    let chat = await Chat.findOne({
      booking: bookingId,
    });

    if (!chat) {
      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

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

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  const chat = await Chat.findOne({
    "messages._id": messageId,
  });

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: "Message not found",
    });
  }

  chat.messages = chat.messages.filter(
    (m) => m._id.toString() !== messageId
  );

  await chat.save();

  if (global.io) {
    global.io.to(chat._id).emit("message_deleted", messageId);
  }

  res.json({
    success: true,
  });
};

export { sendMessage, getChat, deleteMessage };
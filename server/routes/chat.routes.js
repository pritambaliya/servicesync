import express from 'express';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import { getChat, sendMessage, deleteMessage } from '../controllers/chat.controller.js';

const router = express.Router();

router.get(
  "/:bookingId",
  isLoggedIn,
  getChat
);

router.post(
  "/send/:chatId",
  isLoggedIn,
  sendMessage
);

router.delete(
  "/delete/:messageId",
  isLoggedIn,
  deleteMessage
);

export default router;
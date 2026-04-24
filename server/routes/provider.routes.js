import express from 'express';
import upload from "../middleware/upload.middleware.js";
import { registerProvider } from "../controllers/provider.controller.js";


const router = express.Router();

router.post("/register", upload.single("idProof"), registerProvider);
export default router;
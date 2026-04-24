import express from 'express';
import upload from "../middleware/upload.middleware.js";
import { registerProvider } from "../controllers/provider.controller.js";


const router = express.Router();

router.post("/register", upload.fields([ { name: "profileImage" }, { name: "idProof" }]), registerProvider);
export default router;
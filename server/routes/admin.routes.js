import express from "express";
const router = express.Router();

import { getPendingProviders, approveProvider, rejectProvider }  from "../controllers/admin.controller.js";

router.get("/providers/pending", getPendingProviders);
router.put("/provider/:id/approve", approveProvider);
router.put("/provider/:id/reject", rejectProvider);

export default router;
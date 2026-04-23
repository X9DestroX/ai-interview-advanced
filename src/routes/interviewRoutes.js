import express from "express";
import { interviewFlow } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/flow", interviewFlow);

export default router;
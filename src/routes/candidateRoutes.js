import express from "express";
import { inviteCandidate, validateCandidate } from "../controllers/candidateController.js";

const router = express.Router();

router.post("/invite", inviteCandidate);
router.get("/validate/:token", validateCandidate);

export default router;
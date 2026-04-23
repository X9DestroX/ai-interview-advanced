import prisma from "../utils/prisma.js";
import { v4 as uuidv4 } from "uuid";

export const inviteCandidate = async (req, res) => {
  const { email, jobId } = req.body;

  try {
    // 1. Generate unique token
    const token = uuidv4();

    // 2. Save candidate in DB
    const candidate = await prisma.candidate.create({
      data: {
        email,
        jobId,
        token
      }
    });

    // 3. Create magic link
    const link = `http://localhost:3000/interview/${token}`;

    res.json({
      message: "Candidate invited successfully",
      link
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

////////////////////////////Verification part////////////////////////////
export const validateCandidate = async (req, res) => {
  const { token } = req.params;

  try {
    const candidate = await prisma.candidate.findFirst({
      where: { token }
    });

    if (!candidate) {
      return res.status(404).json({ error: "Invalid or expired link" });
    }

    res.json(candidate);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
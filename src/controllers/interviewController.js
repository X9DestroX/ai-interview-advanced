import { handleInterview } from "../services/interviewService.js";
import prisma from "../utils/prisma.js";
import { v4 as uuidv4 } from "uuid";

export const interviewFlow = async (req, res) => {
  let { sessionId, answer, name, email, role } = req.body;

  try {
    // FIRST REQUEST → create candidate + session
    if (!sessionId) {

      // Validate role
      if (!role) {
        return res.status(400).json({ error: "Role is required" });
      }

      const candidate = await prisma.candidate.create({
        data: {
          name,
          email: email || "test@gmail.com",
          role: role, //SAVE ROLE
          jobId: "TEMP_JOB"
        }
      });

      sessionId = uuidv4();

      const result = await handleInterview(
        sessionId,
        answer,
        candidate.id,
        role //PASS ROLE
      );

      return res.json({
        sessionId,
        candidateId: candidate.id,
        role,
        ...result
      });
    }

    // NEXT REQUESTS → continue interview

    //Fetch role from DB (important)
    const interview = await prisma.interview.findFirst({
      where: { sessionId }
    });

    const result = await handleInterview(
      sessionId,
      answer,
      null,
      interview?.role //reuse stored role
    );

    res.json({
      sessionId,
      role: interview?.role,
      ...result
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

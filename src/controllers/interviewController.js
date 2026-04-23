import { handleInterview } from "../services/interviewService.js";

export const interviewFlow = async (req, res) => {
  const { sessionId, answer } = req.body;

  try {
    const result = await handleInterview(sessionId, answer);

    res.json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
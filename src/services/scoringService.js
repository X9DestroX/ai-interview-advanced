import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const evaluateCandidate = async (conversation) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an AI interviewer evaluator.

Analyze the full interview conversation and return:

1. Score (0–100)
2. Strengths (bullet points)
3. Weaknesses (bullet points)
4. Final recommendation (Selected / Rejected)

Return ONLY JSON format like:
{
  "score": 78,
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "recommendation": "Selected"
}
          `,
        },
        ...conversation,
      ],
    });

    return JSON.parse(response.choices[0].message.content);

  } catch (error) {
    console.error(error);
    throw error;
  }
};
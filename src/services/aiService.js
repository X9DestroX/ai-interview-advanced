import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate next question dynamically
export const generateNextQuestion = async (conversationHistory) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an AI interviewer.

Rules:
- Ask one question at a time
- Start easy → increase difficulty
- Ask follow-up based on previous answer
- Max 6 questions total
- Be professional
          `,
        },
        ...conversationHistory,
      ],
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error(error);
    throw error;
  }
};
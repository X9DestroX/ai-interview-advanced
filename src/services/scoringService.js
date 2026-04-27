import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const evaluateCandidate = async (conversation) => {
  try {

    // Format conversation properly
    const formattedConversation = conversation
      .map(c => `${c.role.toUpperCase()}: ${c.content}`)
      .join("\n");

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3, // more consistent scoring
      messages: [
        {
          role: "system",
          content: `
You are a STRICT senior technical interviewer.

Your job is to evaluate the candidate HONESTLY.

========================
SCORING RULES
========================
0–40  → Very Poor → Reject
41–60 → Weak → Reject
61–75 → Average → Maybe
76–90 → Good → Selected
91–100 → Excellent → Strongly Selected

========================
EVALUATION CRITERIA
========================
1. Technical correctness
2. Depth of knowledge
3. Clarity of explanation
4. Real-world understanding
5. Problem-solving ability

========================
STRICT RULES
========================
- DO NOT give default scores like 70
- DO NOT be lenient
- If answers are shallow → LOW score
- If answers are incorrect → VERY LOW score
- If answers lack depth → reduce score

========================
IMPORTANT
========================
- Short answers → penalize
- Generic answers → penalize
- Strong technical answers → reward

========================
OUTPUT (STRICT JSON ONLY)
========================
{
  "score": number,
  "strengths": ["specific strengths"],
  "weaknesses": ["specific weaknesses"],
  "recommendation": "Selected" OR "Rejected"
}
`
        },
        {
          role: "user",
          content: `Evaluate this interview:\n${formattedConversation}`
        }
      ],
    });

    const text = response.choices[0].message.content;

    // Safe JSON parsing
    try {
      return JSON.parse(text);
    } catch (err) {
      console.log("Raw AI Output:", text);

      return {
        score: 50,
        strengths: ["Basic understanding"],
        weaknesses: ["Needs deeper technical knowledge"],
        recommendation: "Rejected"
      };
    }

  } catch (error) {
    console.error("Scoring Error:", error.message);

    return {
      score: 40,
      strengths: [],
      weaknesses: ["Evaluation failed"],
      recommendation: "Rejected"
    };
  }
};

import prisma from "../utils/prisma.js";
import { generateNextQuestion } from "./aiService.js";
import { evaluateCandidate } from "./scoringService.js";

export const handleInterview = async (sessionId, answer) => {

  let interview = await prisma.interview.findFirst({
    where: { sessionId }
  });

  if (!interview) {
    interview = await prisma.interview.create({
      data: {
        sessionId,
        candidateId: "TEMP_ID", // will fix later
        conversation: [],
      }
    });
  }

  let conversation = interview.conversation || [];

  // Add user answer
  if (answer) {
    conversation.push({
      role: "user",
      content: answer
    });
  }

  // 🔴 STOP CONDITION
  if (interview.questionCount >= 5) {

    const evaluation = await evaluateCandidate(conversation);

    await prisma.interview.update({
      where: { id: interview.id },
      data: {
        conversation,
        score: evaluation.score,
        feedback: evaluation
      }
    });

    return {
      done: true,
      result: evaluation
    };
  }

  // Generate next question
  const nextQuestion = await generateNextQuestion(conversation);

  conversation.push({
    role: "assistant",
    content: nextQuestion
  });

  await prisma.interview.update({
    where: { id: interview.id },
    data: {
      conversation,
      questionCount: interview.questionCount + 1
    }
  });

  return {
    done: false,
    question: nextQuestion
  };
};
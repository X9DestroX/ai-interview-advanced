import prisma from "../utils/prisma.js";
import { generateNextQuestion } from "./aiService.js";
import { evaluateCandidate } from "./scoringService.js";

export const handleInterview = async (sessionId, answer, candidateId = null, role = null) => {

  let interview = await prisma.interview.findFirst({
    where: { sessionId }
  });

  // 🟢 Create interview if not exists
  if (!interview) {
      interview = await prisma.interview.create({
        data: {
        sessionId,
        candidateId,
        role,              // Update it to create the role for applicant
        conversation: [],
        questionCount: 0
      }
    });
  }

  let conversation = interview.conversation || [];

  console.log("BEFORE:", conversation);

  // 🟢 Add user answer
  if (answer) {
    conversation.push({
      role: "user",
      content: answer
    });
  }

  // 🔴 STOP after 5 questions
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

  // 🟢 Generate next question
      const nextQuestion = await generateNextQuestion(
      conversation,
      interview.questionCount,
      role
    );

  // 🟢 Add AI question to conversation
  conversation.push({
    role: "assistant",
    content: nextQuestion
  });

  console.log("AFTER:", conversation);

  // 🟢 Save everything
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
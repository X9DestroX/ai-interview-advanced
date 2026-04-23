/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Response` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `conversation` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_interviewId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_questionId_fkey";

-- DropIndex
DROP INDEX "Interview_candidateId_key";

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "conversation" JSONB NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "questionCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "score" DOUBLE PRECISION,
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Response";

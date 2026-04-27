/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `feedback` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Interview` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `Interview` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "createdAt",
DROP COLUMN "feedback",
DROP COLUMN "score",
ALTER COLUMN "conversation" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Interview_sessionId_key" ON "Interview"("sessionId");

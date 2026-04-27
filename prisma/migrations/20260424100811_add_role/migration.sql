-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "name" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'Frontend',
ALTER COLUMN "jobId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "role" TEXT;

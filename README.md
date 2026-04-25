# ai-interview-advanced
Build an AI-powered conversational interviewer that understands job roles, conducts dynamic voice-based interviews via avatar, adapts questions in real time, evaluates candidates across communication, thinking, and skills. This AI-Interview app produces a decision-ready dashboard which is not just raw data.

# ai-interview-backend

# Clone the repository
git clone https://github.com/<your-username>/ai-interview-advanced.git \
cd ai-interview-advanced

# Install Dependencies
npm install

# Setup Environment Variables
cp .env.example .env

# Then edit the .env file
DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_interview_db \
GROQ_API_KEY=your_groq_api_key \
PORT=5000

# Setup Prisma as follow
npx prisma generate \
npx prisma migrate dev

# Run the Server
npm run dev

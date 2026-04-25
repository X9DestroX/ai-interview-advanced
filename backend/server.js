const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data', 'transcripts.json');

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// --- Helpers ---
function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

function readTranscripts() {
  ensureDataDir();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeTranscripts(data) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/**
 * Converts a flat transcript array into Q&A key-value pairs.
 * Model turns are questions, user turns are answers.
 * Each pair: { question: "...", answer: "..." }
 */
function buildQAPairs(transcriptions) {
  const pairs = [];
  let currentQuestion = null;

  for (const item of transcriptions) {
    if (item.source === 'model') {
      // New question: save any pending pair first
      if (currentQuestion !== null) {
        pairs.push({ question: currentQuestion, answer: null });
      }
      currentQuestion = item.text;
    } else if (item.source === 'user' && currentQuestion !== null) {
      pairs.push({ question: currentQuestion, answer: item.text });
      currentQuestion = null;
    }
  }

  // Trailing question with no answer yet
  if (currentQuestion !== null) {
    pairs.push({ question: currentQuestion, answer: null });
  }

  return pairs;
}

// --- Routes ---

/**
 * POST /api/transcripts
 * Body: { transcriptions: TranscriptionItem[] }
 * Saves the interview transcript as Q&A key-value pairs.
 */
app.post('/api/transcripts', (req, res) => {
  const { transcriptions } = req.body;

  if (!Array.isArray(transcriptions) || transcriptions.length === 0) {
    return res.status(400).json({ error: 'transcriptions array is required and must not be empty.' });
  }

  const qa = buildQAPairs(transcriptions);

  const record = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    totalQuestions: qa.filter(p => p.answer !== null).length,
    qa, // array of { question, answer }
  };

  const existing = readTranscripts();
  existing.push(record);
  writeTranscripts(existing);

  console.log(`[${record.createdAt}] Saved interview ${record.id} — ${record.totalQuestions} Q&A pairs.`);
  res.status(201).json({ success: true, id: record.id, qa });
});

/**
 * GET /api/transcripts
 * Returns all stored interview transcripts.
 */
app.get('/api/transcripts', (req, res) => {
  const transcripts = readTranscripts();
  res.json(transcripts);
});

/**
 * GET /api/transcripts/:id
 * Returns a single interview transcript by ID.
 */
app.get('/api/transcripts/:id', (req, res) => {
  const transcripts = readTranscripts();
  const record = transcripts.find(t => t.id === req.params.id);
  if (!record) return res.status(404).json({ error: 'Transcript not found.' });
  res.json(record);
});

// --- Start ---
ensureDataDir();
app.listen(PORT, () => {
  console.log(`Interview backend running on http://localhost:${PORT}`);
});

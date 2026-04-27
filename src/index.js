import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import jobRoutes from "./routes/jobRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/interview", interviewRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running , By Ali");
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

app.get("/test", (req, res) => {
  res.send("Test route working");
});
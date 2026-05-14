import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";

import userRoutes from "./Routes/userRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";

const app = express();

app.use(cors({
  origin: ["https://taskmanager-frontend-blush.vercel.app", "https://taskmanager-popaya.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(json());

app.use("/api/users", userRoutes);
app.use("/api/notes", taskRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
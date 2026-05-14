import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../Controllers/taskController.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

// Protect all task routes
router.use(auth);

router.get("/get-notes", getTasks);
router.post("/create-note", createTask);
router.put("/update-note/:id", updateTask);
router.delete("/delete-note/:id", deleteTask);

export default router;

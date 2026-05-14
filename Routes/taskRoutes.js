import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../Controllers/taskController.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

// Protect all task routes
router.use(auth);

router.get("/get-tasks", getTasks);
router.post("/create-task", createTask);
router.put("/update-task/:id", updateTask);
router.delete("/delete-task/:id", deleteTask);

export default router;

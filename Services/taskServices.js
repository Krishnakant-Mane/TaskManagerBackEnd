import pool from "../config/db.js";

const getAllTaskByUserId = async (userId) => {
    const [rows] = await pool.query(
        "SELECT * FROM tasks WHERE user_id = ? ORDER BY updatedAt DESC",
        [userId]
    );
    console.log(rows);
    
    return rows;
};

const createTaskByUserId = async (title, content, userId) => {
    const [result] = await pool.query(
        "INSERT INTO tasks (title, content, user_id) VALUES (?, ?, ?)",
        [title, content, userId]
    );
    return result;
};

const updateTaskById = async (taskId, title, content, userId) => {
    const [result] = await pool.query(
        "UPDATE tasks SET title = ?, content = ? WHERE task_id = ? AND user_id = ?",
        [title, content, taskId, userId]
    );
    return result;
};

const deleteTaskByUserId = async (taskId, userId) => {
    const [result] = await pool.query(
        "DELETE FROM tasks WHERE task_id = ? AND user_id = ?",
        [taskId, userId]
    );
    return result;
};

export default { getAllTaskByUserId, createTaskByUserId, updateTaskById, deleteTaskByUserId };
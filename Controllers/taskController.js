import taskServices from "../Services/taskServices.js";

const getTasks = async (req, res) => {
    try {
        const userId = req.userId; // Provided by auth middleware
        const tasks = await taskServices.getAllTaskByUserId(userId);
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const createTask = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const result = await taskServices.createTaskByUserId(title, content, userId);
        res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateTask = async (req, res) => {
    try {
        const userId = req.userId;
        const taskId = req.params.id;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const result = await taskServices.updateTaskById(taskId, title, content, userId);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }

        res.json({ message: "Task updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const userId = req.userId;
        const taskId = req.params.id;

        const result = await taskServices.deleteTaskByUserId(taskId, userId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { getTasks, createTask, updateTask, deleteTask };

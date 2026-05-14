import userServices from "../Services/userServices.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        // Check if user exists by email
        const existingEmail = await userServices.getUserByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await userServices.signupUser(username, email, hashedPassword);
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Get user from DB by email
        const user = await userServices.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Simple auth without JWT: we just return the user ID to be sent in future headers
        res.json({ message: "Login successful", userId: user.id, username: user.username, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { signup, login };

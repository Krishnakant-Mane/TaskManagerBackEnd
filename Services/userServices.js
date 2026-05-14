import pool from "../config/db.js";

const signupUser = async (username, email, hashedPassword) => {
    const [result] = await pool.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
    );
    return result;
};

const getUserByEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return rows[0];
};

const getUserByUsername = async (username) => {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );
    return rows[0];
};

export default { signupUser, getUserByEmail, getUserByUsername };

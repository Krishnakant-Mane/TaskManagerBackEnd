const auth = (req, res, next) => {
    // Simple custom auth as requested (no JWT)
    // We expect the client to send their user ID in the headers
    const userId = req.headers["user-id"];

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized. Please login." });
    }

    req.userId = parseInt(userId, 10);
    next();
};

export default auth;

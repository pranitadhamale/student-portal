const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // format: Bearer token
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, "mysecretkey");

        req.user = decoded; // user info attach

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
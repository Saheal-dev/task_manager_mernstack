const jwt = require("jsonwebtoken");

const AuthenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]; // or req.headers.authorization
        let token;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]; // Extract the token
        }

        if (!token) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        // Verify token
        jwt.verify(token, "tcmTM", (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }
            req.user = user; // Attach user info to request
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = { AuthenticateToken };

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "sampath@0000";

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format. Use Bearer <token>." });
  }

  const token = tokenParts[1];

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified; // Attach decoded token to req.user
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticateToken;

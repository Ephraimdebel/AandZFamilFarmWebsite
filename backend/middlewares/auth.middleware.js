const jwt = require("jsonwebtoken");

// Middleware to check if user is authenticated
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

// Middleware to check if user is an admin
function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
}

module.exports = { authMiddleware, adminMiddleware };

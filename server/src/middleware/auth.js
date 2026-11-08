
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

async function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required.",
    });
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

   
const userId = Number(payload.sub);

if (
  typeof payload.sub !== "string" ||
  !/^[1-9]\d*$/.test(payload.sub) ||
  !Number.isSafeInteger(userId)
) {
  return res.status(401).json({
    message: "Invalid authentication token.",
  });
}

    const result = await pool.query(
      `SELECT id, full_name, email, role, status
       FROM users
       WHERE id = $1`,
     [userId]
    );

    const user = result.rows[0];

    if (!user || user.status !== "active") {
      return res.status(401).json({
        message: "Account is unavailable.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired authentication token.",
      });
    }

    next(error);
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action.",
      });
    }

    next();
  };
}

module.exports = { requireAuth, requireRole };

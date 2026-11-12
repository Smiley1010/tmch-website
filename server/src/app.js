
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth.routes");
const invitationRoutes = require("./routes/invitations.routes");
const articleRoutes = require("./routes/articles.routes");

const app = express();

app.disable("x-powered-by");

app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL?.replace(/\/$/, ""),
  "https://tmch-website.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "1mb" }));

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/invitations", invitationRoutes);
app.get("/api/public-blog-test", (req, res) => {
  res.json({
    success: true,
    message: "Public routes are working without authentication."
  });
});

app.use("/api/articles", articleRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "TMCH CMS API is running",
  });
});

app.use((err, req, res, next) => {
  console.error("API error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    message: "An unexpected server error occurred.",
  });
});

module.exports = app;

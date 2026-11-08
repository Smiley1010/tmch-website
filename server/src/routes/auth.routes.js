
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { requireAuth } = require("../middleware/auth");
const { hashInvitationToken } = require("../services/invitations");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { fullName, email, password, invitationToken } = req.body || {};

  if (
    typeof fullName !== "string" ||
    fullName.trim().length < 2 ||
    fullName.trim().length > 150 ||
    typeof email !== "string" ||
    email.trim().length > 254 ||
    typeof password !== "string" ||
    password.length < 12 ||
    password.length > 72 ||
    typeof invitationToken !== "string" ||
    !/^[a-f0-9]{64}$/i.test(invitationToken)
  ) {
    return res.status(400).json({
      message: "Provide valid registration details. Passwords must be 12–72 characters.",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const tokenHash = hashInvitationToken(invitationToken);
  const passwordHash = await bcrypt.hash(password, 12);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const invitationResult = await client.query(
      `SELECT id, email, role
       FROM invitations
       WHERE token_hash = $1
         AND accepted_at IS NULL
         AND revoked_at IS NULL
         AND expires_at > NOW()
       FOR UPDATE`,
      [tokenHash]
    );

    const invitation = invitationResult.rows[0];

    if (!invitation || invitation.email.toLowerCase() !== normalizedEmail) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        message: "Invitation is invalid, expired, or does not match this email.",
      });
    }

    const userResult = await client.query(
      `INSERT INTO users (full_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, role, status`,
      [fullName.trim(), normalizedEmail, passwordHash, invitation.role]
    );

    const user = userResult.rows[0];

    await client.query(
      `UPDATE invitations SET accepted_at = NOW() WHERE id = $1`,
      [invitation.id]
    );

    await client.query(
      `INSERT INTO audit_logs (actor_id, action, entity_type, entity_id)
       VALUES ($1, 'user.registered', 'user', $1)`,
      [user.id]
    );

    await client.query("COMMIT");

    return res.status(201).json({
      message: "Account created. You can now sign in.",
      user,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    if (error.code === "23505") {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    next(error);
  } finally {
    client.release();
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length > 254 ||
    password.length > 72
  ) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  try {
    const result = await pool.query(
      `SELECT id, full_name, email, password_hash, role, status
       FROM users
       WHERE LOWER(email) = $1`,
      [email.trim().toLowerCase()]
    );

    const user = result.rows[0];

    if (
      !user ||
      !(await bcrypt.compare(password, user.password_hash)) ||
      user.status !== "active"
    ) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {},
      process.env.JWT_SECRET,
      {
        algorithm: "HS256",
        subject: String(user.id),
        expiresIn: "2h",
      }
    );

    return res.json({
      token,
      expiresIn: 7200,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;


const express = require("express");
const { z } = require("zod");
const { requireAuth, requireRole } = require("../middleware/auth");
const { createInvitation } = require("../services/invitations");

const router = express.Router();

const invitationSchema = z.object({
  email: z.string().trim().email().max(254),
  role: z.enum(["editor", "writer"]),
});

router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  async (req, res, next) => {
    const parsed = invitationSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Provide a valid email address and role.",
      });
    }

    try {
      const invitation = await createInvitation({
        email: parsed.data.email,
        role: parsed.data.role,
        invitedBy: req.user.id,
      });

      // Development only: return the token so you can test locally.
      // Production must deliver invitations through a secure email service.
      if (process.env.NODE_ENV !== "development") {
        return res.status(201).json({
          message: "Invitation created.",
          email: invitation.email,
          role: invitation.role,
          expiresAt: invitation.expiresAt,
        });
      }

      return res.status(201).json({
        message: "Invitation created. Copy the token and share it securely.",
        email: invitation.email,
        role: invitation.role,
        token: invitation.token,
        expiresAt: invitation.expiresAt,
      });
    } catch (error) {
      if (error.message === "A user with this email already exists.") {
        return res.status(409).json({ message: error.message });
      }

      next(error);
    }
  }
);

module.exports = router;

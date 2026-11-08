
const crypto = require("crypto");
const pool = require("../config/db");

function hashInvitationToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function createInvitation({ email, role, invitedBy }) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!["editor", "writer"].includes(role)) {
    throw new Error("Invitations can only assign editor or writer roles.");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashInvitationToken(token);
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existingUser = await client.query(
      "SELECT id FROM users WHERE LOWER(email) = $1",
      [normalizedEmail]
    );

    if (existingUser.rowCount > 0) {
      throw new Error("A user with this email already exists.");
    }

    await client.query(
      `UPDATE invitations
       SET revoked_at = NOW()
       WHERE LOWER(email) = $1
         AND accepted_at IS NULL
         AND revoked_at IS NULL`,
      [normalizedEmail]
    );

    await client.query(
      `INSERT INTO invitations
         (email, role, token_hash, invited_by, expires_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [normalizedEmail, role, tokenHash, invitedBy, expiresAt]
    );

 
await client.query(
  `INSERT INTO audit_logs (actor_id, action, entity_type, details)
   VALUES (
     $1,
     'invitation.created',
     'invitation',
     jsonb_build_object(
       'email', $2::text,
       'role', $3::text
     )
   )`,
  [invitedBy, normalizedEmail, role]
);


    await client.query("COMMIT");

    // The raw token is returned once so the caller can deliver it securely.
    return {
      email: normalizedEmail,
      role,
      token,
      expiresAt,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  createInvitation,
  hashInvitationToken,
};

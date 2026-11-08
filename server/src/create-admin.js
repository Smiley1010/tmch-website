
require("dotenv").config();

const bcrypt = require("bcryptjs");
const readline = require("readline");
const pool = require("./config/db");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  try {
    const existingAdmin = await pool.query(
      "SELECT id FROM users WHERE role = 'admin' LIMIT 1"
    );

    if (existingAdmin.rowCount > 0) {
      throw new Error(
        "An administrator already exists. Setup stopped."
      );
    }

    const fullName = (await ask("Admin full name: ")).trim();
    const email = (await ask("Admin email: ")).trim().toLowerCase();
    const password = await ask("Admin password (12+ characters): ");

    if (
      fullName.length < 2 ||
      fullName.length > 150 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      password.length < 12 ||
      password.length > 72
    ) {
      throw new Error(
        "Invalid input. Use a valid email, name, and password of 12–72 characters."
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role, status)
       VALUES ($1, $2, $3, 'admin', 'active')
       RETURNING id, full_name, email, role, status`,
      [fullName, email, passwordHash]
    );

    await pool.query(
      `INSERT INTO audit_logs (actor_id, action, entity_type, entity_id)
       VALUES ($1, 'admin.initial_created', 'user', $1)`,
      [result.rows[0].id]
    );

    console.log("\nAdministrator created successfully:");
    console.log(result.rows[0]);
  } catch (error) {
    console.error("\nSetup failed:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await pool.end();
  }
}

main();

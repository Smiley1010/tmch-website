
require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await pool.query("SELECT 1");

    console.log("PostgreSQL connection successful.");

    app.listen(PORT, () => {
      console.log(
        `TMCH CMS API running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Unable to connect to PostgreSQL:",
      error.message
    );

    process.exit(1);
  }
}

startServer();

import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Baca variabel dari .env.local
dotenv.config({ path: ".env.local" });

(async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    console.log("✅ Connected to MySQL:", process.env.DATABASE_NAME);

    const [rows] = await db.query("SELECT COUNT(*) AS total FROM posts");
    console.log("📊 Total posts:", rows[0].total);

    await db.end();
  } catch (error) {
    console.error("❌ Connection failed:", error);
  }
})();

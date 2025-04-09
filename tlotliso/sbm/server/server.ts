import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

//require('dotenv').config();

dotenv.config();

// Create a new instance of express
const app = express();
const connectionString =  process.env.DB_CONNECTION_STRING;
if (!connectionString) {
    console.error('DB_CONNECTION_STRING is not defined in environment variables');
    process.exit(1); // Exit the process if the connection string is missing
  }
// PostgreSQL connection setup
const pool = new Pool({
    connectionString 
});

// Middleware to parse JSON requests
app.use(express.json());

// Sample route to test database connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()"); // Simple query to test connection
    res.json({
      message: "Connection successful!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
});

// Example of another route to interact with the database
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

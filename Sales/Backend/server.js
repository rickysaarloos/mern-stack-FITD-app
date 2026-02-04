// Importeer modules
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";      // MongoDB connectie
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";  // nieuwe user routes

// Laad environment variables
dotenv.config();

// Maak Express app
const app = express();

// Middleware: lees JSON
app.use(express.json());

// Verbind met MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // <— hier je GET /:id route

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Mijn eerste backend!",
    success: true,
  });
});

// Haal PORT uit .env of gebruik 4000
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});

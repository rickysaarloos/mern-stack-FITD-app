import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/authRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";
import userRoutes from "./src/routes/userRoutes.js"; // ✅ DIT ONTBRAK

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// nodig voor ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());

// uploads statisch maken
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes); // ✅ BELANGRIJK

// test route
app.get("/", (req, res) => {
  res.json({ message: "API werkt 🚀" });
});

// database + server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server draait op http://localhost:${PORT}`)
    );
  })
  .catch(console.error);

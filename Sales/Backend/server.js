import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

/* MIDDLEWARES */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.json({ message: "FITD backend draait 🚀" });
});

/* DB + SERVER */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));

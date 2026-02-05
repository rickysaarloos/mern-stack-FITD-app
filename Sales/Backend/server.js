import express from "express";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import itemRoutes from "./src/routes/itemRoutes.js";

dotenv.config();

const app = express();                
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);    

// test route
app.get("/", (req, res) => {
  res.json({ message: "FITD backend draait 🚀" });
});

// db + server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));

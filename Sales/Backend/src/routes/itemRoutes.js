import express from "express";
import { createItem, getMyItems } from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// item plaatsen
router.post("/", protect, createItem);

// 🔐 mijn items ophalen
router.get("/mine", protect, getMyItems);

export default router;

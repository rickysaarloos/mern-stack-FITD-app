import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  getMyItems,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ➕ item aanmaken
router.post(
  "/",
  protect,
  upload.array("images", 5),
  createItem
);

// 📦 mijn items (MOET BOVEN :id)
router.get("/mine", protect, getMyItems);

// 🛍️ feed
router.get("/", getAllItems);

// 🔍 detailpagina
router.get("/:id", getItemById);

// ✏️ item bewerken
router.patch("/:id", protect, updateItem);

// 🗑️ item verwijderen
router.delete("/:id", protect, deleteItem);

export default router;

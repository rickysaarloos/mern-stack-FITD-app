import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  getMyItems,
  updateItem,
  deleteItem,
  buyItem,
  getMySales,
  getMyPurchases
} from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ➕ ITEM AANMAKEN */
router.post(
  "/",
  protect,
  upload.array("images", 5),
  createItem
);

/* 📦 MIJN ITEMS */
router.get("/mine", protect, getMyItems);

/* 💰 MIJN VERKOPEN (US-10) */
router.get("/sales/mine", protect, getMySales);

// 🛒 mijn aankopen
router.get("/purchases/mine", protect, getMyPurchases);


/* 🛍️ FEED */
router.get("/", getAllItems);

/* 🛒 ITEM KOPEN */
router.patch("/:id/buy", protect, buyItem);

/* 🔍 DETAILPAGINA (MOET NA SPECIFIEKE ROUTES) */
router.get("/:id", getItemById);

/* ✏️ ITEM BEWERKEN */
router.patch("/:id", protect, updateItem);

/* 🗑️ ITEM VERWIJDEREN */
router.delete("/:id", protect, deleteItem);

export default router;

import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  getMyItems,
  buyItem,
  getMySales,
  getMyPurchases,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";


import { protect, optionalProtect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.array("images", 5), createItem);

router.get("/mine", protect, getMyItems);
router.get("/sales/mine", protect, getMySales);
router.get("/purchases/mine", protect, getMyPurchases);

router.get("/", optionalProtect, getAllItems);
router.get("/:id", getItemById);

router.patch("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

router.patch("/:id/buy", protect, buyItem);


export default router;

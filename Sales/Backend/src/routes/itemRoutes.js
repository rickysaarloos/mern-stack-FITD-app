import express from "express";
import {
  createItem,
  getMyItems,
  updateItem,
} from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.array("images", 5), createItem);


router.get("/mine", protect, getMyItems);


router.patch("/:id", protect, updateItem);

export default router;

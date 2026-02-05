import Item from "../models/Item.js";

export const createItem = async (req, res) => {
  try {
    const { title, description, price, size, brand } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({
        error: "Titel, beschrijving en prijs zijn verplicht",
      });
    }

    const item = await Item.create({
      seller: req.user._id, // 🔐 uit JWT
      title,
      description,
      price,
      size,
      brand,
      images: [], // later uitbreiden
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("CREATE ITEM ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

import Item from "../models/Item.js";

// ➕ item aanmaken
export const createItem = async (req, res) => {
  try {
    const { title, description, price, size, brand } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({
        error: "Titel, beschrijving en prijs zijn verplicht",
      });
    }

    const item = await Item.create({
      seller: req.user._id,
      title,
      description,
      price,
      size,
      brand,
      images: [],
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("CREATE ITEM ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 📦 mijn items ophalen
export const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({
      seller: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error("GET MY ITEMS ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

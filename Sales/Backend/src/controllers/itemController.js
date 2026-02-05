import Item from "../models/Item.js";

// ➕ item aanmaken
export const createItem = async (req, res) => {
  try {
    const { title, description, price, brand } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ error: "Velden verplicht" });
    }

    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const item = await Item.create({
      seller: req.user._id,
      title,
      description,
      price,
      brand,
      images,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Item aanmaken mislukt" });
  }
};

// 📦 eigen items ophalen
export const getMyItems = async (req, res) => {
  const items = await Item.find({ seller: req.user._id }).sort("-createdAt");
  res.json(items);
};

// ✏️ ITEM BEWERKEN (US-06)
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Item niet gevonden" });
    }

    // 🔐 alleen eigenaar
    if (item.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Geen toegang" });
    }

    item.title = req.body.title ?? item.title;
    item.description = req.body.description ?? item.description;
    item.price = req.body.price ?? item.price;
    item.brand = req.body.brand ?? item.brand;
    item.status = req.body.status ?? item.status;

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Item bewerken mislukt" });
  }
};

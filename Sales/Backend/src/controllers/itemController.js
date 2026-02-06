import Item from "../models/Item.js";

/* =========================
   ➕ ITEM AANMAKEN
========================= */
export const createItem = async (req, res) => {
  try {
    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const item = await Item.create({
      seller: req.user.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      images,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: "Item aanmaken mislukt" });
  }
};

/* =========================
   🛍️ FEED – ALLE ITEMS
========================= */
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ status: "te koop" })
      .populate("seller", "username")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Items ophalen mislukt" });
  }
};

/* =========================
   🔍 ITEM DETAIL
========================= */
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("seller", "username email");

    if (!item) {
      return res.status(404).json({ message: "Item niet gevonden" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Item ophalen mislukt" });
  }
};

/* =========================
   📦 MIJN ITEMS
========================= */
export const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ seller: req.user.id })
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Mijn items ophalen mislukt" });
  }
};

/* =========================
   ✏️ ITEM BEWERKEN
========================= */
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item niet gevonden" });
    }

    if (item.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Geen toestemming" });
    }

    if (item.status === "verkocht") {
      return res
        .status(400)
        .json({ message: "Verkocht item kan niet aangepast worden" });
    }

    item.title = req.body.title ?? item.title;
    item.description = req.body.description ?? item.description;
    item.price = req.body.price ?? item.price;
    item.brand = req.body.brand ?? item.brand;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Item bijwerken mislukt" });
  }
};

/* =========================
   🗑️ ITEM VERWIJDEREN
========================= */
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item niet gevonden" });
    }

    if (item.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Geen toestemming" });
    }

    await item.deleteOne();
    res.json({ message: "Item verwijderd" });
  } catch (error) {
    res.status(500).json({ message: "Item verwijderen mislukt" });
  }
};

/* =========================
   💳 ITEM KOPEN
========================= */
export const buyItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item niet gevonden" });
    }

    if (item.status === "verkocht") {
      return res.status(400).json({ message: "Item is al verkocht" });
    }

    if (item.seller.toString() === req.user.id) {
      return res
        .status(400)
        .json({ message: "Je kan je eigen item niet kopen" });
    }

    item.status = "verkocht";
    item.buyer = req.user.id;

    const soldItem = await item.save();
    res.json(soldItem);
  } catch (error) {
    res.status(500).json({ message: "Aankoop mislukt" });
  }
};

/* =========================
   📊 MIJN VERKOPEN (US-10)
========================= */
export const getMySales = async (req, res) => {
  try {
    const sales = await Item.find({
      seller: req.user.id,
      status: "verkocht",
    })
      .populate("buyer", "username email")
      .sort({ updatedAt: -1 });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Verkopen ophalen mislukt" });
  }
};

/* =========================
   🛒 MIJN AANKOPEN (US-09)
========================= */
export const getMyPurchases = async (req, res) => {
  try {
    const purchases = await Item.find({
      buyer: req.user.id,
      status: "verkocht",
    })
      .populate("seller", "username email")
      .sort({ updatedAt: -1 });

    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Aankopen ophalen mislukt" });
  }
};

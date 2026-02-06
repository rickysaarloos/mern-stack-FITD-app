import Item from "../models/Item.js";

/* ➕ ITEM AANMAKEN */
export const createItem = async (req, res) => {
  try {
    const images = req.files
      ? req.files.map((f) => `/uploads/${f.filename}`)
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
  } catch {
    res.status(400).json({ message: "Item aanmaken mislukt" });
  }
};

/* 🛍️ FEED */
export const getAllItems = async (req, res) => {
  try {
    const filter = { status: "te koop" };

    if (req.user) {
      filter.seller = { $ne: req.user.id };
    }

    const items = await Item.find(filter)
      .populate("seller", "username")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch {
    res.status(500).json({ message: "Items ophalen mislukt" });
  }
};

/* 🔍 DETAIL */
export const getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id)
    .populate("seller", "username email");

  if (!item) return res.status(404).json({ message: "Niet gevonden" });

  res.json(item);
};

/* 📦 MIJN ITEMS */
export const getMyItems = async (req, res) => {
   const items = await Item.find({
    seller: req.user.id,
    status: "te koop",
  }).sort({ createdAt: -1 });
  res.json(items);
};

/* 💳 KOPEN */
export const buyItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) return res.status(404).json({ message: "Niet gevonden" });
  if (item.status === "verkocht")
    return res.status(400).json({ message: "Al verkocht" });
  if (item.seller.toString() === req.user.id)
    return res.status(400).json({ message: "Eigen item" });

  item.status = "verkocht";
  item.buyer = req.user.id;
  await item.save();

  res.json(item);
};

/* 📊 MIJN VERKOPEN */
export const getMySales = async (req, res) => {
  const sales = await Item.find({
    seller: req.user.id,
    status: "verkocht",
  }).populate("buyer", "username email");

  res.json(sales);
};

/* 🧾 MIJN AANKOPEN */
export const getMyPurchases = async (req, res) => {
  const purchases = await Item.find({
    buyer: req.user.id,
    status: "verkocht",
  }).populate("seller", "username email");

  res.json(purchases);
};

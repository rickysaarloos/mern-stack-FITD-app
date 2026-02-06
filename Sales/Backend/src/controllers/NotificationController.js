import Notification from "../models/Notification.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .populate("item", "title")
      .populate("buyer", "username email")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch {
    res.status(500).json({ message: "Meldingen ophalen mislukt" });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({ message: "Melding niet gevonden" });
    }

    notification.read = true;
    await notification.save();

    res.json(notification);
  } catch {
    res.status(500).json({ message: "Melding bijwerken mislukt" });
  }
};
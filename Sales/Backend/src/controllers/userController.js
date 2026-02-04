import User from "../models/userModel.js";

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");

    if (!user) {
      return res.status(404).json({ message: "Gebruiker niet gevonden" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Ongeldig user ID" });
  }
};

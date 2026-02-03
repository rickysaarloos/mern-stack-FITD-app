import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  // check input
  if (!email || !password) {
    return res.status(400).json({ message: "Email en password verplicht" });
  }

  // user zoeken
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Login fout" });
  }

  // password check
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    return res.status(401).json({ message: "Login fout" });
  }

  // JWT maken
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // terugsturen
  res.json({ token });
};

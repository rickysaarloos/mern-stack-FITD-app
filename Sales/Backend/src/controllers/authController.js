import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * JWT helper
 */
const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
  );
};

/**
 * =========================
 * REGISTER USER
 * POST /api/auth/register
 * =========================
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check of body bestaat
    if (!req.body) {
      return res.status(400).json({ error: 'Geen data meegestuurd' });
    }

    // 2. Validatie
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Username, email en password zijn verplicht'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Wachtwoord moet minimaal 6 tekens zijn'
      });
    }

    // 3. Check of email al bestaat
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        error: 'Email bestaat al'
      });
    }

    // 4. Check of username al bestaat
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        error: 'Gebruikersnaam is al in gebruik'
      });
    }

    // 5. Hash wachtwoord
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. User opslaan
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // 7. JWT token
    const token = createToken(user._id);

    // 8. Response
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });

  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * =========================
 * LOGIN USER
 * POST /api/auth/login
 * =========================
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validatie
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email en wachtwoord zijn verplicht'
      });
    }

    // 2. User zoeken
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: 'Ongeldige login'
      });
    }

    // 3. Wachtwoord check
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        error: 'Ongeldige login'
      });
    }

    // 4. Token
    const token = createToken(user._id);

    // 5. Response
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

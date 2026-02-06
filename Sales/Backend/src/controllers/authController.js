import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


 
const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
  );
};


export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  Check body 
    if (!req.body) {
      return res.status(400).json({ error: 'Geen data meegestuurd' });
    }

    //  Validatie
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

    //  Check  email 
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        error: 'Email bestaat al'
      });
    }

    //  Check username
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        error: 'Gebruikersnaam is al in gebruik'
      });
    }

    //  Hash 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  User opslaan
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

   
    const token = createToken(user._id);

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


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Validatie
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email en wachtwoord zijn verplicht'
      });
    }

    //  zoeken
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: 'Ongeldige login'
      });
    }

    //  Wachtwoord check
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        error: 'Ongeldige login'
      });
    }

    
    const token = createToken(user._id);

    //  Response
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

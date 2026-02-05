import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './src/routes/authRoutes.js';
import dotenv from 'dotenv';
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());   
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'FITD backend draait 🚀' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));

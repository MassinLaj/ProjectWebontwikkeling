import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || '';
const PORT = process.env.PORT || 3000;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Succesvol verbonden met MongoDB Atlas');
    app.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Fout bij het verbinden met MongoDB Atlas:', err);
    process.exit(1);
  });

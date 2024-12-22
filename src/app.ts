import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import gebruikersRoutes from './routes/gebruikersRoutes';
import uitgavenRoutes from './routes/uitgavenRoutes';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', gebruikersRoutes);
app.use('/uitgaven', uitgavenRoutes);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Verbonden met MongoDB'))
  .catch(err => console.error('Fout bij het verbinden met MongoDB:', err));

export default app;

import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'geheim',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

export default app;

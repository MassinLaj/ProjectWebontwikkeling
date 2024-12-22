import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import uitgavenRoutes from './routes/uitgavenRoutes';
import { isAuthenticated } from './middleware/authMiddleware';

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Debugging Middleware voor sessies
app.use((req, res, next) => {
  console.log('Sessie:', req.session);
  next();
});

// Set up sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'geheim',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Set view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/auth', authRoutes);
app.use('/uitgaven', isAuthenticated, uitgavenRoutes);

// Dashboard route voor ingelogde gebruikers
app.get('/dashboard', isAuthenticated, (req, res) => {
  const gebruikerId = (req.session as any).gebruikerId; // Cast naar any om TypeScript-fouten te voorkomen
  res.render('dashboard', { gebruikerId });
});

// Root Route
app.get('/', (req, res) => {
  res.render('index'); // Render de index.ejs view
});

export default app;
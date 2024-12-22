import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware';

const router = express.Router();

// Dashboard route
router.get('/dashboard', isAuthenticated, (req, res) => {
  const gebruikerId = (req.session as any).gebruikerId; // Sessie-ID ophalen
  res.render('dashboard', { gebruikerId });
});

export default router;

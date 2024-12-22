import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware';
import {
  voegUitgaveToe,
  haalUitgavenOp,
  haalUitgaveOp,
  updateUitgave,
  verwijderUitgave,
} from '../controllers/uitgavenController';

const router = express.Router();

// Formulier om een nieuwe uitgave toe te voegen
router.get('/toevoegen', isAuthenticated, (req, res) => {
  res.render('voeg-uitgave-toe'); // Render het formulier
});

// Route om een uitgave toe te voegen
router.post('/toevoegen', isAuthenticated, voegUitgaveToe);

// Route om alle uitgaven op te halen
router.get('/', isAuthenticated, haalUitgavenOp);

// Route om een specifieke uitgave op te halen voor bewerken
router.get('/bewerken/:id', isAuthenticated, haalUitgaveOp);

// Route om een uitgave bij te werken
router.post('/bewerken/:id', isAuthenticated, updateUitgave);

// Route om een uitgave te verwijderen
router.get('/verwijderen/:id', isAuthenticated, verwijderUitgave);

export default router;

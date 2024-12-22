import express from 'express';
import {
    voegUitgaveToe,
    haalUitgaveOp,
    bewerkUitgave,
    verwijderUitgave
  } from '../controllers/uitgavenController';
  

const router = express.Router();

router.post('/toevoegen', voegUitgaveToe);
router.get('/bewerken/:id', haalUitgaveOp);
router.post('/bewerken/:id', bewerkUitgave);
router.get('/verwijderen/:id', verwijderUitgave);

export default router;
export { voegUitgaveToe, haalUitgaveOp, bewerkUitgave, verwijderUitgave };

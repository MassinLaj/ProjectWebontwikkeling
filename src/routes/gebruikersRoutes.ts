import express from 'express';
import { haalAlleGebruikersOp } from '../controllers/gebruikersController';

const router = express.Router();

router.get('/', haalAlleGebruikersOp);

export default router;

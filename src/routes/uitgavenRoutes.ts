import express from 'express';
import { voegUitgaveToe } from '../controllers/uitgavenController';

const router = express.Router();

router.post('/toevoegen', voegUitgaveToe);

export default router;

import { Request, Response } from 'express';
import { Gebruiker } from '../models/gebruiker';

export const haalAlleGebruikersOp = async (req: Request, res: Response) => {
  try {
    const gebruikers = await Gebruiker.find().populate('uitgaven');
    res.render('index', { gebruikers });
  } catch (error) {
    console.error('Fout bij het ophalen van gebruikers:', error);
    res.status(500).send('Er is een fout opgetreden');
  }
};

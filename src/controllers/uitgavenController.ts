import { Request, Response } from 'express';
import { Uitgave } from '../models/uitgave';

export const voegUitgaveToe = async (req: Request, res: Response) => {
  const { beschrijving, bedrag, valuta } = req.body;
  const uitgave = new Uitgave({ beschrijving, bedrag, valuta });
  await uitgave.save();
  res.redirect('/');
};

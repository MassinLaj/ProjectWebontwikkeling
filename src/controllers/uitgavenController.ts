import { Request, Response } from 'express';
import { Uitgave } from '../models/uitgave';
import { Gebruiker } from '../models/gebruiker';

// Voeg een uitgave toe
export const voegUitgaveToe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gebruikerId, beschrijving, bedrag, valuta, categorie, isBetaald } = req.body;

    const gebruiker = await Gebruiker.findById(gebruikerId);
    if (!gebruiker) {
      res.status(404).send('Gebruiker niet gevonden');
      return;
    }

    const uitgave = new Uitgave({
      beschrijving,
      bedrag,
      valuta,
      categorie,
      isBetaald,
      isInkomend: false,
      datum: new Date(),
    });

    await uitgave.save();
    gebruiker.uitgaven.push(uitgave);
    await gebruiker.save();

    res.status(201).send('Uitgave succesvol toegevoegd');
  } catch (error) {
    console.error('Fout bij het toevoegen van de uitgave:', error);
    res.status(500).send('Er is een fout opgetreden');
  }
};

// Haal een specifieke uitgave op
export const haalUitgaveOp = async (req: Request, res: Response): Promise<void> => {
  try {
    const uitgave = await Uitgave.findById(req.params.id);
    if (!uitgave) {
      res.status(404).send('Uitgave niet gevonden');
      return;
    }
    res.json(uitgave);
  } catch (error) {
    console.error('Fout bij het ophalen van de uitgave:', error);
    res.status(500).send('Er is een fout opgetreden');
  }
};

// Bewerk een bestaande uitgave
export const bewerkUitgave = async (req: Request, res: Response): Promise<void> => {
  try {
    const uitgave = await Uitgave.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!uitgave) {
      res.status(404).send('Uitgave niet gevonden');
      return;
    }
    res.json(uitgave);
  } catch (error) {
    console.error('Fout bij het bewerken van de uitgave:', error);
    res.status(500).send('Er is een fout opgetreden');
  }
};

// Verwijder een bestaande uitgave
export const verwijderUitgave = async (req: Request, res: Response): Promise<void> => {
  try {
    const uitgave = await Uitgave.findByIdAndDelete(req.params.id);
    if (!uitgave) {
      res.status(404).send('Uitgave niet gevonden');
      return;
    }
    res.json({ message: 'Uitgave succesvol verwijderd' });
  } catch (error) {
    console.error('Fout bij het verwijderen van de uitgave:', error);
    res.status(500).send('Er is een fout opgetreden');
  }
};

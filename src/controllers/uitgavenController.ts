// uitgavenController.ts
import { Request, Response } from 'express';
import { Uitgave } from '../models/uitgave';

// Voeg een nieuwe uitgave toe
export const voegUitgaveToe = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Ontvangen data:', req.body); // Debug de ontvangen gegevens

    const { description, amount, category, isPaid, isIncoming, paymentMethod, currency } = req.body;
    const gebruikerId = (req.session as any).gebruikerId;

    const nieuweUitgave = new Uitgave({
      description,
      amount,
      category,
      isPaid,
      isIncoming: isIncoming === 'true',
      paymentMethod,
      currency,
      gebruikerId,
    });

    await nieuweUitgave.save();
    res.redirect('/uitgaven');
  } catch (error) {
    console.error('Fout bij het toevoegen van een uitgave:', error);
    res.status(500).send('Er is een fout opgetreden bij het toevoegen van een uitgave.');
  }
};


// Haal alle uitgaven op voor de ingelogde gebruiker
export const haalUitgavenOp = async (req: Request, res: Response): Promise<void> => {
  try {
    const gebruikerId = (req.session as any).gebruikerId;
    const uitgaven = await Uitgave.find({ gebruikerId });
    res.render('uitgaven-lijst', { uitgaven });
  } catch (error) {
    console.error('Fout bij het ophalen van uitgaven:', error);
    res.status(500).send('Er is een fout opgetreden bij het ophalen van de uitgaven.');
  }
};

// Haal een specifieke uitgave op
export const haalUitgaveOp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const uitgave = await Uitgave.findById(id);

    if (!uitgave) {
      res.status(404).send('Uitgave niet gevonden');
      return;
    }

    res.render('bewerk-uitgave', { uitgave });
  } catch (error) {
    console.error('Fout bij het ophalen van een specifieke uitgave:', error);
    res.status(500).send('Er is een fout opgetreden.');
  }
};

// Werk een bestaande uitgave bij
export const updateUitgave = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { description, amount, category, isPaid, isIncoming, paymentMethod, currency } = req.body;

    const uitgave = await Uitgave.findByIdAndUpdate(id, {
      description,
      amount,
      category,
      isPaid,
      isIncoming,
      paymentMethod,
      currency,
    });

    if (!uitgave) {
      res.status(404).send('Uitgave niet gevonden');
      return;
    }

    res.redirect('/uitgaven');
  } catch (error) {
    console.error('Fout bij het bijwerken van een uitgave:', error);
    res.status(500).send('Er is een fout opgetreden bij het bijwerken van de uitgave.');
  }
};

// Verwijder een uitgave
export const verwijderUitgave = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const uitgave = await Uitgave.findByIdAndDelete(id);

    if (!uitgave) {
      res.status(404).send('Uitgave niet gevonden');
      return;
    }

    res.redirect('/uitgaven');
  } catch (error) {
    console.error('Fout bij het verwijderen van een uitgave:', error);
    res.status(500).send('Er is een fout opgetreden bij het verwijderen van de uitgave.');
  }
};
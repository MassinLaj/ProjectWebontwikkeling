import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Gebruiker } from '../models/gebruiker';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const gebruiker = await Gebruiker.findOne({ naam: username });

    if (!gebruiker) {
      res.status(401).send('Onjuiste gebruikersnaam of wachtwoord');
      return;
    }

    if (!(await bcrypt.compare(password, gebruiker.password))) {
      res.status(401).send('Onjuiste gebruikersnaam of wachtwoord');
      return;
    }

    // Inline cast om TypeScript-fouten te vermijden
    const session = req.session as any;
    session.gebruikerId = gebruiker._id.toString();

    console.log('Sessie ingesteld:', session.gebruikerId); // Debug-log
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Fout bij login:', error);
    res.status(500).send('Er is een fout opgetreden bij het inloggen.');
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const bestaandeGebruiker = await Gebruiker.findOne({ naam: username });
    if (bestaandeGebruiker) {
      res.status(400).send('Gebruikersnaam bestaat al');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nieuweGebruiker = new Gebruiker({
      naam: username,
      password: hashedPassword,
    });

    await nieuweGebruiker.save();
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Fout bij registratie:', error);
    res.status(500).send('Er is een fout opgetreden bij het registreren.');
  }
};

export const logout = (req: Request, res: Response): void => {
  const session = req.session as any;
  if (!session) {
    res.redirect('/auth/login');
    return;
  }

  session.destroy((err: any) => {
    if (err) {
      console.error('Fout bij logout:', err);
      res.status(500).send('Er is een fout opgetreden bij het uitloggen.');
      return;
    }
    res.redirect('/auth/login');
  });
};

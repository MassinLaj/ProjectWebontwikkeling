import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Gebruiker } from '../models/gebruiker';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Zoek naar de gebruiker in de database
    const gebruiker = await Gebruiker.findOne({ naam: username });

    if (!gebruiker || !(await bcrypt.compare(password, gebruiker.password))) {
      res.status(401).send('Onjuiste gebruikersnaam of wachtwoord');
      return;
    }

    // Controleer of `req.session` beschikbaar is en stel de gebruikerId in
    if (req.session) {
      req.session.gebruikerId = gebruiker._id.toString(); // Zet gebruikerId als string
    }

    res.redirect('/');
  } catch (error) {
    console.error('Fout bij login:', error);
    res.status(500).send('Er is een fout opgetreden bij het inloggen.');
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Controleer of de gebruikersnaam al bestaat
    const bestaandeGebruiker = await Gebruiker.findOne({ naam: username });
    if (bestaandeGebruiker) {
      res.status(400).send('Gebruikersnaam bestaat al');
      return;
    }

    // Hash het wachtwoord en maak een nieuwe gebruiker aan
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
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Fout bij logout:', err);
          res.status(500).send('Er is een fout opgetreden bij het uitloggen.');
          return;
        }
        res.redirect('/auth/login');
      });
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.error('Fout bij logout:', error);
    res.status(500).send('Er is een fout opgetreden bij het uitloggen.');
  }
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const gebruiker_1 = require("../models/gebruiker");
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const gebruiker = await gebruiker_1.Gebruiker.findOne({ naam: username });
        if (!gebruiker) {
            res.status(401).send('Onjuiste gebruikersnaam of wachtwoord');
            return;
        }
        if (!(await bcrypt_1.default.compare(password, gebruiker.password))) {
            res.status(401).send('Onjuiste gebruikersnaam of wachtwoord');
            return;
        }
        // Inline cast om TypeScript-fouten te vermijden
        const session = req.session;
        session.gebruikerId = gebruiker._id.toString();
        console.log('Sessie ingesteld:', session.gebruikerId); // Debug-log
        res.redirect('/dashboard');
    }
    catch (error) {
        console.error('Fout bij login:', error);
        res.status(500).send('Er is een fout opgetreden bij het inloggen.');
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const bestaandeGebruiker = await gebruiker_1.Gebruiker.findOne({ naam: username });
        if (bestaandeGebruiker) {
            res.status(400).send('Gebruikersnaam bestaat al');
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const nieuweGebruiker = new gebruiker_1.Gebruiker({
            naam: username,
            password: hashedPassword,
        });
        await nieuweGebruiker.save();
        res.redirect('/auth/login');
    }
    catch (error) {
        console.error('Fout bij registratie:', error);
        res.status(500).send('Er is een fout opgetreden bij het registreren.');
    }
};
exports.register = register;
const logout = (req, res) => {
    const session = req.session;
    if (!session) {
        res.redirect('/auth/login');
        return;
    }
    session.destroy((err) => {
        if (err) {
            console.error('Fout bij logout:', err);
            res.status(500).send('Er is een fout opgetreden bij het uitloggen.');
            return;
        }
        res.redirect('/auth/login');
    });
};
exports.logout = logout;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haalAlleGebruikersOp = void 0;
const gebruiker_1 = require("../models/gebruiker");
const haalAlleGebruikersOp = async (req, res) => {
    try {
        const gebruikers = await gebruiker_1.Gebruiker.find().populate('uitgaven');
        res.render('index', { gebruikers });
    }
    catch (error) {
        console.error('Fout bij het ophalen van gebruikers:', error);
        res.status(500).send('Er is een fout opgetreden');
    }
};
exports.haalAlleGebruikersOp = haalAlleGebruikersOp;

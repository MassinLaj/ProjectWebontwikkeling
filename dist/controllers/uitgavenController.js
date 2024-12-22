"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verwijderUitgave = exports.updateUitgave = exports.haalUitgaveOp = exports.haalUitgavenOp = exports.voegUitgaveToe = void 0;
const uitgave_1 = require("../models/uitgave");
// Voeg een nieuwe uitgave toe
const voegUitgaveToe = async (req, res) => {
    try {
        console.log('Ontvangen data:', req.body); // Debug de ontvangen gegevens
        const { description, amount, category, isPaid, isIncoming, paymentMethod, currency } = req.body;
        const gebruikerId = req.session.gebruikerId;
        const nieuweUitgave = new uitgave_1.Uitgave({
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
    }
    catch (error) {
        console.error('Fout bij het toevoegen van een uitgave:', error);
        res.status(500).send('Er is een fout opgetreden bij het toevoegen van een uitgave.');
    }
};
exports.voegUitgaveToe = voegUitgaveToe;
// Haal alle uitgaven op voor de ingelogde gebruiker
const haalUitgavenOp = async (req, res) => {
    try {
        const gebruikerId = req.session.gebruikerId;
        const uitgaven = await uitgave_1.Uitgave.find({ gebruikerId });
        res.render('uitgaven-lijst', { uitgaven });
    }
    catch (error) {
        console.error('Fout bij het ophalen van uitgaven:', error);
        res.status(500).send('Er is een fout opgetreden bij het ophalen van de uitgaven.');
    }
};
exports.haalUitgavenOp = haalUitgavenOp;
// Haal een specifieke uitgave op
const haalUitgaveOp = async (req, res) => {
    try {
        const { id } = req.params;
        const uitgave = await uitgave_1.Uitgave.findById(id);
        if (!uitgave) {
            res.status(404).send('Uitgave niet gevonden');
            return;
        }
        res.render('bewerk-uitgave', { uitgave });
    }
    catch (error) {
        console.error('Fout bij het ophalen van een specifieke uitgave:', error);
        res.status(500).send('Er is een fout opgetreden.');
    }
};
exports.haalUitgaveOp = haalUitgaveOp;
// Werk een bestaande uitgave bij
const updateUitgave = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, amount, category, isPaid, isIncoming, paymentMethod, currency } = req.body;
        const uitgave = await uitgave_1.Uitgave.findByIdAndUpdate(id, {
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
    }
    catch (error) {
        console.error('Fout bij het bijwerken van een uitgave:', error);
        res.status(500).send('Er is een fout opgetreden bij het bijwerken van de uitgave.');
    }
};
exports.updateUitgave = updateUitgave;
// Verwijder een uitgave
const verwijderUitgave = async (req, res) => {
    try {
        const { id } = req.params;
        const uitgave = await uitgave_1.Uitgave.findByIdAndDelete(id);
        if (!uitgave) {
            res.status(404).send('Uitgave niet gevonden');
            return;
        }
        res.redirect('/uitgaven');
    }
    catch (error) {
        console.error('Fout bij het verwijderen van een uitgave:', error);
        res.status(500).send('Er is een fout opgetreden bij het verwijderen van de uitgave.');
    }
};
exports.verwijderUitgave = verwijderUitgave;

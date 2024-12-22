"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voegUitgaveToe = void 0;
const uitgave_1 = require("../models/uitgave");
const voegUitgaveToe = async (req, res) => {
    const { beschrijving, bedrag, valuta } = req.body;
    const uitgave = new uitgave_1.Uitgave({ beschrijving, bedrag, valuta });
    await uitgave.save();
    res.redirect('/');
};
exports.voegUitgaveToe = voegUitgaveToe;

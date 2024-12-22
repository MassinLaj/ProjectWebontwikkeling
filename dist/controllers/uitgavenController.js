"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verwijderUitgave = exports.bewerkUitgave = exports.haalUitgaveOp = exports.voegUitgaveToe = void 0;
var uitgave_1 = require("../models/uitgave");
var gebruiker_1 = require("../models/gebruiker");
// Voeg een uitgave toe
var voegUitgaveToe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, gebruikerId, beschrijving, bedrag, valuta, categorie, isBetaald, gebruiker, uitgave, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, gebruikerId = _a.gebruikerId, beschrijving = _a.beschrijving, bedrag = _a.bedrag, valuta = _a.valuta, categorie = _a.categorie, isBetaald = _a.isBetaald;
                return [4 /*yield*/, gebruiker_1.Gebruiker.findById(gebruikerId)];
            case 1:
                gebruiker = _b.sent();
                if (!gebruiker) {
                    res.status(404).send('Gebruiker niet gevonden');
                    return [2 /*return*/];
                }
                uitgave = new uitgave_1.Uitgave({
                    beschrijving: beschrijving,
                    bedrag: bedrag,
                    valuta: valuta,
                    categorie: categorie,
                    isBetaald: isBetaald,
                    isInkomend: false,
                    datum: new Date(),
                });
                return [4 /*yield*/, uitgave.save()];
            case 2:
                _b.sent();
                gebruiker.uitgaven.push(uitgave);
                return [4 /*yield*/, gebruiker.save()];
            case 3:
                _b.sent();
                res.status(201).send('Uitgave succesvol toegevoegd');
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error('Fout bij het toevoegen van de uitgave:', error_1);
                res.status(500).send('Er is een fout opgetreden');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.voegUitgaveToe = voegUitgaveToe;
// Haal een specifieke uitgave op
var haalUitgaveOp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uitgave, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, uitgave_1.Uitgave.findById(req.params.id)];
            case 1:
                uitgave = _a.sent();
                if (!uitgave) {
                    res.status(404).send('Uitgave niet gevonden');
                    return [2 /*return*/];
                }
                res.json(uitgave);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Fout bij het ophalen van de uitgave:', error_2);
                res.status(500).send('Er is een fout opgetreden');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.haalUitgaveOp = haalUitgaveOp;
// Bewerk een bestaande uitgave
var bewerkUitgave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uitgave, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, uitgave_1.Uitgave.findByIdAndUpdate(req.params.id, req.body, { new: true })];
            case 1:
                uitgave = _a.sent();
                if (!uitgave) {
                    res.status(404).send('Uitgave niet gevonden');
                    return [2 /*return*/];
                }
                res.json(uitgave);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Fout bij het bewerken van de uitgave:', error_3);
                res.status(500).send('Er is een fout opgetreden');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.bewerkUitgave = bewerkUitgave;
// Verwijder een bestaande uitgave
var verwijderUitgave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uitgave, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, uitgave_1.Uitgave.findByIdAndDelete(req.params.id)];
            case 1:
                uitgave = _a.sent();
                if (!uitgave) {
                    res.status(404).send('Uitgave niet gevonden');
                    return [2 /*return*/];
                }
                res.json({ message: 'Uitgave succesvol verwijderd' });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('Fout bij het verwijderen van de uitgave:', error_4);
                res.status(500).send('Er is een fout opgetreden');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verwijderUitgave = verwijderUitgave;

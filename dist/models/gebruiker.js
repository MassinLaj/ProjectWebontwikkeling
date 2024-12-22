"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gebruiker = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var gebruikerSchema = new mongoose_1.default.Schema({
    naam: { type: String, required: true },
    password: { type: String, required: true },
});
exports.Gebruiker = mongoose_1.default.model('Gebruiker', gebruikerSchema);

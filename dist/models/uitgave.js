"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uitgave = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var uitgaveSchema = new mongoose_1.default.Schema({
    beschrijving: { type: String, required: true },
    bedrag: { type: Number, required: true },
    valuta: { type: String, required: true },
});
exports.Uitgave = mongoose_1.default.model('Uitgave', uitgaveSchema);

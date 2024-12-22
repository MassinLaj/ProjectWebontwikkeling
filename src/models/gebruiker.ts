import mongoose, { Document } from 'mongoose';
import { IUitgave } from './uitgave';

export interface IGebruiker extends Document {
  naam: string;
  uitgaven: IUitgave[];
}

const gebruikerSchema = new mongoose.Schema({
  naam: { type: String, required: true },
  uitgaven: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Uitgave' }]
});

export const Gebruiker = mongoose.model<IGebruiker>('Gebruiker', gebruikerSchema);

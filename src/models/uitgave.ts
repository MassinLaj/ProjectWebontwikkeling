import mongoose, { Document } from 'mongoose';

export interface IUitgave extends Document {
  beschrijving: string;
  bedrag: number;
  valuta: string;
}

const uitgaveSchema = new mongoose.Schema({
  beschrijving: { type: String, required: true },
  bedrag: { type: Number, required: true },
  valuta: { type: String, required: true },
});

export const Uitgave = mongoose.model<IUitgave>('Uitgave', uitgaveSchema);

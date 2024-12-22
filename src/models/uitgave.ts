import mongoose, { Schema, Document } from 'mongoose';

export interface IUitgave extends Document { 
  beschrijving: string;
  bedrag: number;
  valuta: string;
  categorie: string;
  isBetaald: boolean;
  isInkomend: boolean;
  datum: Date;
  betalingsMethode: {
    methode: string;
  };
  tags: string[];
}

const uitgaveSchema: Schema = new Schema({
  beschrijving: { type: String, required: true },
  bedrag: { type: Number, required: true },
  valuta: { type: String, required: true },
  categorie: { type: String, required: true },
  isBetaald: { type: Boolean, default: false },
  isInkomend: { type: Boolean, default: false },
  datum: { type: Date, default: Date.now },
  betalingsMethode: { type: Object, default: {} },
  tags: [{ type: String }]
});

export const Uitgave = mongoose.model<IUitgave>('Uitgave', uitgaveSchema);

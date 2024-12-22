import mongoose, { Document, Types } from 'mongoose';

export interface IGebruiker extends Document {
  _id: Types.ObjectId; 
  naam: string;
  password: string;
}

const gebruikerSchema = new mongoose.Schema({
  naam: { type: String, required: true },
  password: { type: String, required: true },
});

export const Gebruiker = mongoose.model<IGebruiker>('Gebruiker', gebruikerSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface PaymentMethod {
  method: string; // Bijv. "Credit Card", "Bank Transfer", "Cash", "PayPal"
  cardDetails?: {
    maskedNumber: string;
    expiryDate: string;
  };
  bankAccountNumber?: string;
}

export interface IUitgave extends Document {
  description: string;
  amount: number;
  date: Date;
  currency: string; // Bijv. "USD", "EUR"
  paymentMethod: PaymentMethod;
  isIncoming: boolean;
  category: string; // Bijv. "food", "drinks", "huur"
  tags: string[]; // Bijv. ["pizza", "monthly"]
  isPaid: boolean;
  gebruikerId: string; // ID van de gebruiker
}

const UitgaveSchema: Schema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now, required: true },
  currency: { type: String, required: true },
  paymentMethod: {
    method: { type: String, required: true },
    cardDetails: {
      maskedNumber: { type: String },
      expiryDate: { type: String },
    },
    bankAccountNumber: { type: String },
  },
  isIncoming: { type: Boolean, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: false },
  isPaid: { type: Boolean, required: true },
  gebruikerId: { type: String, required: true },
});


export const Uitgave = mongoose.model<IUitgave>('Uitgave', UitgaveSchema);

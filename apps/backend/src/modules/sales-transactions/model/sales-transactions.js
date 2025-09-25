import { Schema, model } from 'mongoose';

const salesTransactionSchema = new Schema({
  transactionType: {
    type: String,
    enum: [ 'In', 'Out' ],
    required: true,
  },
  qtyChange: {
    type: Number,
    min: [1, 'Quantity change must be at least 1'],
    required: true,
  }
}, {
  timestamps: true,
});

export const salesTransaction = model('salesTransaction', salesTransactionSchema);
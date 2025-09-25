import { Schema, model } from 'mongoose';

const inventoryTransactionSchema = new Schema({
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

export const InventoryTransaction = model('InventoryTransaction', inventoryTransactionSchema);
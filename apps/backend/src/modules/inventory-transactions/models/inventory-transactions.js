import { Schema, model } from 'mongoose';

export const TransactionType = {
  In: 'In',
  Out: 'Out',
};

const inventoryTransactionSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    transactionType: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    quantityChange: {
      type: Number,
      min: [1, 'Quantity change must be at least 1'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const InventoryTransaction = model('InventoryTransaction', inventoryTransactionSchema);

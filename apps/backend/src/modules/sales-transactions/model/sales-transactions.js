import { Schema, model } from 'mongoose';

//Schema for each item sold in the transaction
const itemSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  qty: {
    type: Number,
    min: [1, 'Quantity must be at least 1'],
    required: true,
  },
  unitPrice: {
    type: Number,
    min: [1, 'Unit price must be at least 1'],
    required: true,
  },
  totalPrice: {
    type: Number,
    min: [1, 'Total price must be at least 1'],
    required: true,
  },
}, {
  _id: false,
});

// Main schema for sales transactions
const salesTransactionSchema = new Schema({
  items: {
    type: [itemSchema],
    required: true,
    validate: {
      validator: function (itemsArray) {
        const isArray = Array.isArray(itemsArray);
        const hasItems = isArray && itemsArray.length > 0;
        return hasItems;
      },
      message: 'Referenced product dos not exits.',
    },
  },

}, {
  timestamps: true,
});

export const salesTransaction = model('salesTransaction', salesTransactionSchema);
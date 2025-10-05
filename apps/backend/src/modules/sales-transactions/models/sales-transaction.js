import { Schema, model } from 'mongoose';

// Schema for each product sold in the transaction
const productSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: true,
    timestamps: true,
  },
);

// Main schema for sales transactions
const salesTransactionSchema = new Schema(
  {
    products: {
      type: [productSchema],
      required: true,
      validate: {
        validator: function (productsArray) {
          return Array.isArray(productsArray) && productsArray.length > 0;
        },
        message: 'Referenced product does not exist.',
      },
    },
  },
  {
    timestamps: true,
  },
);

export const SalesTransaction = model('salesTransaction', salesTransactionSchema);

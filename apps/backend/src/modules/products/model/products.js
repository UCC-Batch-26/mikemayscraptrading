import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
      trim: true,
    },
    purchasePrice: {
      type: Number,
      min: [0, 'Purchase price must be at least 1'],
    },
    sellingPrice: {
      type: Number,
      min: [0, 'Selling price must be at least 1'],
    },
    quantity: {
      type: Number,
      min: [1, 'Quantity must be at least 1'],
      required: true,
    },
    unit: {
      type: String,
      enum: ['kgs', 'pcs'],
      required: true,
    },
    description: {
      type: String,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model('Product', productSchema);

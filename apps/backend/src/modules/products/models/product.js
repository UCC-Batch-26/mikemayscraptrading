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
      default: 0,
    },
    sellingPrice: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
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

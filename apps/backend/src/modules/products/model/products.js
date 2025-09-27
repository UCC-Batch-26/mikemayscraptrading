import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
    trim: true,
  },
  img: {
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
    min: [0, 'Purchase price must be at least 0'],
  },
  sellingPrice: {
    type: Number,
    min: [0, 'Selling price must be at least 0'],
  },
  qty: {
    type: Number,
    min: [1, 'Quantity must be at least 1'],
    required: true,
  },
  unit: {
    type: String,
    enum: ['kgs', 'pcs'],
    required: true,
  },
  productStatus: {
    type: String,
    enum: ['In Stock', 'Sold Out'],
    default: 'In Stock',
  },
  description: {
    type: String,
    maxLength: 100,
  }
},{
  timestamps: true,
});

export const Product = model('Product', productSchema);
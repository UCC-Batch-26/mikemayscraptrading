import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { Product } from '#modules/products/models/product.js';
import { log } from '#utils/log.js';

export async function addInventoryTransaction(req, res) {
  try {
    const { productId, transactionType, quantityChange } = req.body;

    const inventoryTransaction = await InventoryTransaction.create({
      productId,
      transactionType,
      quantityChange,
    });

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (transactionType === 'In') {
      product.quantity += quantityChange;
    } else if (transactionType === 'Out') {
      product.quantity -= quantityChange;
      if (product.quantity < 0) product.quantity = 0; // optional: prevent negative quantity
    }

    await product.save();

    return res.status(201).json({
      message: 'Successfully created inventory transaction and updated product quantity',
      data: inventoryTransaction,
    });
  } catch (error) {
    log('addInventoryTransaction', 'Error creating inventory transaction:', error);

    return res.status(400).json({
      message: error?.message ?? 'Something went wrong creating inventory transaction',
    });
  }
}

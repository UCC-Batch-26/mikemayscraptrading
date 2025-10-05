import { SalesTransaction } from '#modules/sales-transactions/models/sales-transaction.js';
import { Product } from '#modules/products/models/product.js';
import { log } from '#utils/log.js';

export async function addSalesTransaction(req, res) {
  try {
    const { products } = req.body;

    const transaction = await SalesTransaction.create({ products });

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(400).json({
          message: `Product with ID ${item.productId} not found.`,
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient quantity for product ${product.name}.`,
        });
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    return res.status(201).json({
      message: 'Sales transaction created successfully and product quantities updated.',
      data: transaction,
    });
  } catch (error) {
    log('addSalesTransaction', 'Error creating sales transaction:', error);
    return res.status(500).json({
      message: error?.message ?? 'Something went wrong while creating the sales transaction.',
    });
  }
}

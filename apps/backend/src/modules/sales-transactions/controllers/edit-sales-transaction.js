import { SalesTransaction } from '#modules/sales-transactions/models/sales-transaction.js';
import { Product } from '#modules/products/models/product.js';
import { log } from '#utils/log.js';

export async function editSalesTransaction(req, res) {
  const { id } = req.params;
  const { products } = req.body;

  try {
    const existingTransaction = await SalesTransaction.findById(id).orFail();

    for (const item of existingTransaction.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

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

    const updatedTransaction = await SalesTransaction.findByIdAndUpdate(
      id,
      { products },
      { new: true, runValidators: true },
    ).orFail();

    return res.status(200).json({
      message: 'Sales transaction updated successfully and product quantities adjusted.',
      data: updatedTransaction,
    });
  } catch (error) {
    log('editSalesTransaction', 'Error updating sales transaction:', error);

    let status = 400;
    if (error.name === 'DocumentNotFoundError') status = 404;

    return res.status(status).json({
      message: error?.message ?? 'Failed to update sales transaction.',
    });
  }
}

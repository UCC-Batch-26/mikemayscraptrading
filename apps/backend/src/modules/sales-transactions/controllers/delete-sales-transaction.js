import { SalesTransaction } from '#modules/sales-transactions/models/sales-transaction.js';
import { Product } from '#modules/products/models/product.js';
import { log } from '#utils/log.js';

export async function deleteSalesTransaction(req, res) {
  const { id } = req.params;

  try {
    const deletedTransaction = await SalesTransaction.findByIdAndDelete(id).orFail();

    for (const item of deletedTransaction.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

    return res.status(200).json({
      message: `Sales transaction with ID ${id} deleted successfully and product quantities restored.`,
      data: deletedTransaction,
    });
  } catch (error) {
    log('deleteSalesTransaction', 'Error deleting sales transaction:', error);

    const status = error.name === 'DocumentNotFoundError' ? 404 : 400;

    return res.status(status).json({
      message: error?.message ?? 'Failed to delete sales transaction.',
    });
  }
}

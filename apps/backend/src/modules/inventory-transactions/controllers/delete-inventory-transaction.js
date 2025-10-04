import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { Product } from '#modules/products/models/product.js'; // adjust path
import { log } from '#utils/log.js';

export async function deleteInventoryTransaction(req, res) {
  const { id } = req.params;

  try {
    // Step 1: Find the transaction (but don't delete yet)
    const transaction = await InventoryTransaction.findById(id).orFail();

    // Step 2: Find the associated product
    const product = await Product.findById(transaction.productId).orFail();

    // Step 3: Reverse the quantity change
    if (transaction.transactionType === 'In') {
      product.quantity -= transaction.quantityChange;
      if (product.quantity < 0) product.quantity = 0; // optional safeguard
    } else if (transaction.transactionType === 'Out') {
      product.quantity += transaction.quantityChange;
    }

    // Step 4: Save product changes
    await product.save();

    // Step 5: Delete the transaction
    const deleted = await InventoryTransaction.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Successfully deleted inventory transaction and updated product quantity',
      data: deleted,
    });
  } catch (error) {
    log('deleteInventoryTransaction', 'Error deleting inventory transaction:', error);

    let statusCode = 400;
    if (error.name === 'DocumentNotFoundError') {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      error: error?.message ?? 'Unable to delete inventory transaction',
    });
  }
}

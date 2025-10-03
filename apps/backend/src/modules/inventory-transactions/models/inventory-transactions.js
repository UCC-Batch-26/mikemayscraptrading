import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { Product } from '#modules/products/models/product.js';
import { log } from '#utils/log.js';

export async function editInventoryTransaction(req, res) {
  const { id } = req.params;

  try {
    const oldTransaction = await InventoryTransaction.findById(id).orFail();
    const product = await Product.findById(oldTransaction.productId).orFail();

    if (oldTransaction.transactionType === 'In') {
      product.quantity -= oldTransaction.quantityChange;
    } else if (oldTransaction.transactionType === 'Out') {
      product.quantity += oldTransaction.quantityChange;
    }

    await product.save();

    const updated = await InventoryTransaction.findByIdAndUpdate(id, req.updateData, {
      new: true,
      runValidators: true,
    }).orFail();

    if (updated.transactionType === 'In') {
      product.quantity += updated.quantityChange;
    } else if (updated.transactionType === 'Out') {
      product.quantity -= updated.quantityChange;
    }

    await product.save();

    return res.status(200).json({
      message: 'Successfully updated inventory transaction',
      data: updated,
    });
  } catch (error) {
    log('editInventoryTransaction', 'Error updating inventory transaction:', error);

    const statusCode = error.name === 'DocumentNotFoundError' ? 404 : 400;
    return res.status(statusCode).json({
      error: error?.message ?? 'Unable to update inventory transaction',
    });
  }
}

import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { log } from '#utils/log.js';

export async function editInventoryTransaction(req, res) {
  const { id } = req.params;

  try {
    const updated = await InventoryTransaction.findByIdAndUpdate(id, req.updateData, {
      new: true,
      runValidators: true,
    }).orFail();

    return res.status(200).json({
      message: 'Successfully updated inventory transaction',
      data: updated,
    });
  } catch (error) {
    log('editInventoryTransaction', 'Error updating inventory transaction:', error);

    let statusCode = 400;
    if (error.name === 'DocumentNotFoundError') {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      error: error?.message ?? 'Unable to update inventory transaction',
    });
  }
}

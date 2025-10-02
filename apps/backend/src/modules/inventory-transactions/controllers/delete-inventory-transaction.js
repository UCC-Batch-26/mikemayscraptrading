import { InventoryTransaction } from '../models/inventory-transactions';
import { log } from '#utils/log.js';

export async function deleteInventoryTransaction(req, res) {
  const { id } = req.params;

  try {
    const deleted = await InventoryTransaction.findByIdAndDelete(id).orFail();

    return res.status(200).json({
      message: 'Successfully deleted inventory transaction',
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

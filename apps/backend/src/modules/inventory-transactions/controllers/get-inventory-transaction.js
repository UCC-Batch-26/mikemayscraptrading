import { InventoryTransaction } from "../models/inventory-transactions";
import { log } from "#utils/log.js";

export async function getInventoryTransaction(req, res) {
  const { id } = req.params;

  try {
    const inventoryTransaction = await InventoryTransaction.findById(id).orFail();

    return res.status(200).json({
      message: 'Successfully retrieved inventory transaction',
      data: inventoryTransaction,
    });
  } catch (error) {
    log('getInventoryTransaction', 'Unable to retrieve inventory trransaction:', error);

    let statusCode = 400;

    if (error.name === 'DocumentNotFoundError') {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      error: error?.message ?? 'Unable to retrieve inventory transaction'
    });
  }
}
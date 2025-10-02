import { InventoryTransaction } from '#models/inventory-transactions';
import { log } from '#utils/log.js';

export async function addInventoryTransaction(req, res) {
  try {
    const { transactionType, quantityChange } = req.body;
    const inventoryTransaction = await InventoryTransaction.create({ transactionType, quantityChange });

    return res.status(201).json({
      message: 'Successfully created inventory transaction',
      data: inventoryTransaction,
    });
  } catch (error) {
    log('addInventoryTransaction', 'Error creating inventory transaction:', error);

    return res.status(400).json({
      message: error?.message ?? 'Something went wrong creating sample',
    });
  }
}

import { InventoryTransaction } from "../models/inventory-transactions";
import { log } from "#utils/log.js";

export async function getAllInventoryTransactions(req, res) {
  try {
    const allInventoryTransactions = await InventoryTransaction.find({});

    return res.status(200).json({
      data: allInventoryTransactions,
    });
  } catch (error) {
    log('getAllInventoryTransactions', error);

    return res.status(400).json({
      message: error?.message ?? 'Something went wrong retrieving all inventory transactions',
    });
  }
}
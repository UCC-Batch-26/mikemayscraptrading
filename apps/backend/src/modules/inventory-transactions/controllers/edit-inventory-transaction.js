import { InventoryTransaction } from "#models/inventory-transactions";
import { log } from "#utils/log.js";

export async function patchInventoryTransaction(req, res) {
  const { id } = req.params;

  const allowedFields = [ 
    'transactionType',
    'quantityChange'
  ];
}
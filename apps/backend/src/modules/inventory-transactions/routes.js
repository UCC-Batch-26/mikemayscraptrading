import { Router } from 'express';
import { addInventoryTransaction } from '#modules/inventory-transactions/controllers/add-inventory-transaction.js';
import { getAllInventoryTransactions } from '#modules/inventory-transactions/controllers/get-all-inventory-transactions.js';
import { getInventoryTransaction } from '#modules/inventory-transactions/controllers/get-inventory-transaction.js';
import { deleteInventoryTransaction } from '#modules/inventory-transactions/controllers/delete-inventory-transaction.js';
import { editInventoryTransaction } from '#modules/inventory-transactions/controllers/edit-inventory-transaction.js';
import { filterInventoryTransaction } from '#modules/inventory-transactions/middlewares/filter-inventory-transaction.js';

const router = new Router();

router.post('/', addInventoryTransaction);
router.get('/', getAllInventoryTransactions);
router.get('/:id', getInventoryTransaction);
router.delete('/:id', deleteInventoryTransaction);
router.patch('/:id', filterInventoryTransaction, editInventoryTransaction);

export default router;

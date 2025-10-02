import { Router } from 'express';
import { addInventoryTransaction } from './controllers/add-inventory-transaction';
import { getAllInventoryTransactions } from './controllers/get-all-inventory-transactions';
import { getInventoryTransaction } from './controllers/get-inventory-transaction';
import { deleteInventoryTransaction } from './controllers/delete-inventory-transaction';
import { editInventoryTransaction } from './controllers/edit-inventory-transaction';
import { filterInventoryTransaction } from '#modules/inventory-transactions/middlewares/filter-inventory-transaction-fields.js';

const router = new Router();

router.post('/', addInventoryTransaction);
router.get('/', getAllInventoryTransactions);
router.get('/:id', getInventoryTransaction);
router.delete('/:id', deleteInventoryTransaction);
router.patch('/:id', filterInventoryTransaction, editInventoryTransaction);

export default router;
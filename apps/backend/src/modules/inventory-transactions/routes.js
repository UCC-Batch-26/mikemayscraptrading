import { Router } from 'express';
import { addInventoryTransaction } from './controllers/add-inventory-transaction';
import { getAllInventoryTransactions } from './controllers/get-all-inventory-transactions';
import { getInventoryTransaction } from './controllers/get-inventory-transaction';

const router = new Router();

router.post('/', addInventoryTransaction);
router.get('/', getAllInventoryTransactions);
router.get('/:id', getInventoryTransaction);

export default router;
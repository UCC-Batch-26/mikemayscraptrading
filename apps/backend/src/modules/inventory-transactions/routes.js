import { Router } from 'express';
import { addInventoryTransaction } from './controllers/add-inventory-transaction';
import { getAllInventoryTransactions } from './controllers/get-all-inventory-transactions';

const router = new Router();

router.post('/', addInventoryTransaction);
router.get('/', getAllInventoryTransactions);

export default router;
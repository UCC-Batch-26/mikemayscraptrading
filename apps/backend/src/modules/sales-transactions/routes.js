import { Router } from 'express';
import { getAllSalesTransactions } from '#sales-transactions/controllers/get-all-sales-transactions.js';
import { getSalesTransaction } from '#sales-transactions/controllers/get-sale-transaction.js';
import { addSalesTransaction } from '#sales-transactions/controllers/add-sales-transaction.js';
import { editSalesTransaction } from '#sales-transactions/controllers/edit-sales-transaction.js';
import { deleteSalesTransaction } from '#sales-transactions/controllers/delete-sales-transaction.js';
import { validateProductArray } from '#sales-transactions/middlewares/validate-product-array.js';
import { validateProductItems } from '#sales-transactions/middlewares/validate-product-items.js';

const router = new Router();

router.post('/', validateProductArray, validateProductItems, addSalesTransaction);
router.get('/', getAllSalesTransactions);
router.get('/:id', getSalesTransaction);
router.patch('/:id', editSalesTransaction);
router.delete('/:id', deleteSalesTransaction);

export default router;

import { Router } from 'express';
import { getAllSalesTransactions } from '#modules/sales-transactions/controllers/get-all-sales-transactions.js';
import { getSalesTransaction } from '#modules/sales-transactions/controllers/get-sales-transaction.js';
import { addSalesTransaction } from '#modules/sales-transactions/controllers/add-sales-transaction.js';
import { editSalesTransaction } from '#modules/sales-transactions/controllers/edit-sales-transaction.js';
import { deleteSalesTransaction } from '#modules/sales-transactions/controllers/delete-sales-transaction.js';
import { validateProductArray } from '#modules/sales-transactions/middlewares/validate-product-array.js';
import { validateProductItems } from '#modules/sales-transactions/middlewares/validate-product-items.js';

const router = new Router();

router.post('/', validateProductArray, validateProductItems, addSalesTransaction);
router.get('/', getAllSalesTransactions);
router.get('/:id', getSalesTransaction);
router.patch('/:id', editSalesTransaction);
router.delete('/:id', deleteSalesTransaction);

export default router;

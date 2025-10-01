import { Router } from 'express';
import { getAllProducts } from './controllers/get-all-products.js';
import { getProduct } from './controllers/get-product.js';
import { editProduct } from './controllers/edit-product.js';
import { addProduct } from './controllers/add-product.js';
import { deleteProduct } from './controllers/delete-product.js';
import { filterUpdateFields } from './middlewares/filter-update-fields.js';

const router = new Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/:id', addProduct);
router.patch('/:id', filterUpdateFields,editProduct);
router.delete('/:id', deleteProduct);

export default router;

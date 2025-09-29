import { Router } from 'express';
import { getAllProducts } from './controllers/get-all-products.js';
import { getProduct } from './controllers/get-product.js';
import { editProduct } from './controllers/addProduct.js';
import { addProduct } from './controllers/addProduct.js';
import { deleteProduct } from './controllers/deleteProduct.js';

const router = new Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/:id', addProduct);
router.patch('/:id', editProduct);
router.delete('/:id', deleteProduct);

export default router;

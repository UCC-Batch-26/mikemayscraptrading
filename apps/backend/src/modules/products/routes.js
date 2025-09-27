import { Router } from 'express';
import { getAllProducts } from './controllers/get-all-products.js';
import { getProduct } from './controllers/get-product.js';

const router = new Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);

export default router;
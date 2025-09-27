import { Router } from 'express';
import { getAllProducts } from './controllers/get-all-products.js';

const router = new Router();

router.get('/', getAllProducts);

export default router;
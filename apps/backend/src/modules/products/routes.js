import { Router } from 'express';
import { getAllProducts } from './controllers/get-all-products.js';
import { getProduct } from '#modules/products/controllers/get-product.js';
import { editProduct } from '#modules/products/controllers/edit-product.js';
import { addProduct } from '#modules/products/controllers/add-product.js';
import { deleteProduct } from '#modules/products/controllers/delete-product.js';
import { filterUpdateFields } from '#modules/products/middlewares/filter-update-fields.js';

const router = new Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', (req, res, next) => {
  console.log('✅ Received POST /');
  console.log('📦 Request body:', req.body);
  next();
}, addProduct);

router.patch('/:id', filterUpdateFields, editProduct);
router.delete('/:id', deleteProduct);

export default router;

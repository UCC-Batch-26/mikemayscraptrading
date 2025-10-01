import { Router } from 'express';
import { addInventoryTransaction } from './controllers/add-inventory-transaction';

const router = new Router();

router.post('/', addInventoryTransaction);
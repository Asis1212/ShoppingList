import { Router } from 'express';
import { getOrders, createOrder } from '../controllers/orderController';

const router = Router();

router.get('/', getOrders);
router.post('/createOrder', createOrder);

export default router;

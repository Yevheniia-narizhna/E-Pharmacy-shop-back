import { Router } from 'express';
import authRouter from './auth.js';
import productRouter from './product.js';
import orderRouter from './order.js';

const router = Router();

router.use('/api', authRouter);
router.use('/api/products', productRouter);
router.use('/api/cart', orderRouter);

export default router;

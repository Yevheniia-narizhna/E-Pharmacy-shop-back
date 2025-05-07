import { Router } from 'express';
import authRouter from './auth.js';
import productRouter from './products.js';
import cartRouter from './cart.js';

const router = Router();

router.use('/api', authRouter);
router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter);

export default router;

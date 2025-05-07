import express from 'express';

// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { cartCheckSchema, updateCartSchema } from '../validation/cart.js';

const jsonParser = express.json();

const router = express.Router();

router.get('/');

router.put('/update', jsonParser, validateBody(updateCartSchema));

router.post('/checkout', jsonParser, validateBody(cartCheckSchema));

export default router;

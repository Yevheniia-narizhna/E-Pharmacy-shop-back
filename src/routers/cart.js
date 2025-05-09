import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { cartCheckSchema, updateCartSchema } from '../validation/cart.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addToCartContr,
  cartCheckoutContr,
  decreaseQuantityContr,
  getCartItemsContr,
  removeFromCartContr,
  updateCartContr,
} from '../controllers/cart.js';

const router = express.Router();
const jsonParser = express.json();
router.use(authenticate);

router.get('/', ctrlWrapper(getCartItemsContr));

router.put(
  '/update',
  jsonParser,
  validateBody(updateCartSchema),
  ctrlWrapper(updateCartContr),
);

router.post(
  '/checkout',
  jsonParser,
  validateBody(cartCheckSchema),
  ctrlWrapper(cartCheckoutContr),
);

router.patch('/add', ctrlWrapper(addToCartContr));
router.patch('/decrease', ctrlWrapper(decreaseQuantityContr));

router.delete('/remove/:productId', ctrlWrapper(removeFromCartContr));

export default router;

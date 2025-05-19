import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema, registerSchema } from '../validation/auth.js';
import {
  getAllStoresContr,
  getCustomerReviewsContr,
  getNearestStoresContr,
  getUserInfoContr,
  loginContr,
  logoutContr,
  registerContr,
} from '../controllers/auth.js';
// import { authenticate } from '../middlewares/authenticate.js';

const jsonParser = express.json();

const router = express.Router();

router.post(
  '/user/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerContr),
);

router.post(
  '/user/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginContr),
);

router.get('/user/logout', ctrlWrapper(logoutContr));

router.get('/user/user-info', ctrlWrapper(getUserInfoContr));

router.get('/stores/nearest', ctrlWrapper(getNearestStoresContr));

router.get('/customer-reviews', ctrlWrapper(getCustomerReviewsContr));

router.get('/stores', ctrlWrapper(getAllStoresContr));

export default router;

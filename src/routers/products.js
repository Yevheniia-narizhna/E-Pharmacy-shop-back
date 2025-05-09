import express from 'express';
import {
  getAllProductsContr,
  getProductByIdContr,
} from '../controllers/products.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';

// const jsonParser = express.json();

const router = express.Router();

router.get('/', ctrlWrapper(getAllProductsContr));

router.get('/:id', ctrlWrapper(getProductByIdContr));

export default router;

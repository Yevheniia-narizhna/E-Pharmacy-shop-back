import express from 'express';

// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';

// const jsonParser = express.json();

const router = express.Router();

router.get('/');

router.put('/update');

router.post('/checkout');

export default router;

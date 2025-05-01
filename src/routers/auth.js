import express from 'express';

// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';

// const jsonParser = express.json();

const router = express.Router();

router.post('/user/register');

router.post('/user/login');

router.get('/user/logout');

router.get('/user/user-info');

router.get('/stores/nearest');

router.get('/customer-reviews');

router.get('/stores');

export default router;

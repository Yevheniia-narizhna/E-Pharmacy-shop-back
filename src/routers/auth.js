import express from 'express';

// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema, registerSchema } from '../validation/auth.js';

const jsonParser = express.json();

const router = express.Router();

router.post('/user/register', jsonParser, validateBody(registerSchema));

router.post('/user/login', jsonParser, validateBody(loginSchema));

router.get('/user/logout');

router.get('/user/user-info');

router.get('/stores/nearest');

router.get('/customer-reviews');

router.get('/stores');

export default router;

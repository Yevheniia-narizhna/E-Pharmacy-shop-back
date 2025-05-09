import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw createHttpError(401, 'User not authenticated');
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(createHttpError(401, 'User not authenticated'));
    }
    req.user = user;
    next();
  } catch {
    next(createHttpError(401, 'User not authenticated'));
  }
};

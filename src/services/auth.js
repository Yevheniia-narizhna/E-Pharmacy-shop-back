import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Review } from '../models/reviews.js';
import { NearestStore, Store } from '../models/storesNearest.js';
import { User } from '../models/users.js';


const { SECRET_KEY } = process.env;

export const register = async ({ name, email, phone, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    phone,
    password: hashPassword,
  });

  return {
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

  await User.findByIdAndUpdate(user._id, { token });

  return {
    token,
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  };
};

export const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { token: '' });
};

export const getUserInfo = async (email) => {
  const user = await User.findOne({ email });
  return {
    name: user.name,
    email: user.email,
  };
};

export const getAllStores = async (limit = 9) => {
  return await Store.find({}).sort({ name: 1 }).limit(limit);
};

export const getNearestStores = async (limit = 6) => {
  return await NearestStore.find({}).limit(limit);
};

export const getCustomerReviews = async (limit = 3) => {
  return await Review.find({}).limit(limit);
};

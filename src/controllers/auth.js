import {
  getAllStores,
  getCustomerReviews,
  getNearestStores,
  getUserInfo,
  login,
  logout,
  register,
} from '../services/auth.js';

export const registerContr = async (req, res, next) => {
  try {
    const user = await register(req.body);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const loginContr = async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const logoutContr = async (req, res, next) => {
  try {
    await logout(req.user._id);
    res.status(204).json({ message: 'Logout success' });
  } catch (err) {
    next(err);
  }
};

export const getUserInfoContr = async (req, res, next) => {
  try {
    const user = await getUserInfo(req.user.email);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const getAllStoresContr = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 9;
    const result = await getAllStores(limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getNearestStoresContr = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 6;
    const result = await getNearestStores(limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getCustomerReviewsContr = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 3;
    const result = await getCustomerReviews(limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

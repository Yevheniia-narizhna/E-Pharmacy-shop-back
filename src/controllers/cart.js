import {
  addToCart,
  cartCheckout,
  decreaseQuantity,
  getCartItems,
  removeFromCart,
  updateCart,
} from '../services/cart.js';

export const getCartItemsContr = async (req, res, next) => {
  try {
    const { cartProducts, total } = await getCartItems(req.user._id);
    res.json({ cartProducts, total });
  } catch (err) {
    next(err);
  }
};

export const updateCartContr = async (req, res, next) => {
  try {
    const updatedCart = await updateCart(req.user._id, req.body.products);
    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

export const cartCheckoutContr = async (req, res, next) => {
  try {
    const result = await cartCheckout(req.user._id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const addToCartContr = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { productId, quantity } = req.body;

    const cart = await addToCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const decreaseQuantityContr = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { productId, quantity } = req.body;

    const cart = await decreaseQuantity(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const removeFromCartContr = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { productId } = req.params;

    const updatedCart = await removeFromCart(userId, productId);
    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

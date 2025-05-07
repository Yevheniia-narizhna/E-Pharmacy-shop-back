import { cartCheckout, getCartItems, updateCart } from '../services/cart';

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

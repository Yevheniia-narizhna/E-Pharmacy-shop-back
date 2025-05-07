import { User } from '../models/users';
import { Cart } from '../models/cart';
import { Product } from '../models/products';
import createHttpError from 'http-errors';

export const getCartItems = async (userId) => {
  if (!userId) throw createHttpError(400, 'User id is required');

  const user = await User.findById(userId);
  if (!user) throw createHttpError(404, 'User not found');

  let cart = await Cart.findOne({ userId }).populate({
    path: 'products.productId',
    model: 'products',
  });

  if (!cart) {
    cart = await Cart.create({ userId, products: [] });
    user.cart = cart._id;
    await user.save();
  }

  const cartProducts = cart?.products || [];

  let total = 0;
  for (const item of cartProducts) {
    const product = item.productId;
    if (!product) continue;
    total += product.price * item.quantity;
  }

  await Cart.findOneAndUpdate(
    { userId },
    { total: total.toFixed(2) },
    { new: true },
  );

  return { cartProducts, total };
};

export const updateCart = async (userId, products) => {
  if (!userId) throw createHttpError(400, 'User id is required');
  if (!products || !Array.isArray(products)) {
    throw createHttpError(400, 'Products array is required');
  }

  let cart = await Cart.findOne({ userId });

  let total = 0;
  const updatedProducts = [];

  for (const item of products) {
    const { productId, quantity } = item;
    const product = await Product.findById(productId);
    if (!product)
      throw createHttpError(404, `Product with id ${productId} not found`);
    updatedProducts.push({ productId, quantity });
    total += product.price * quantity;
  }

  cart = await Cart.findOneAndUpdate(
    { userId },
    { products: updatedProducts, total: total.toFixed(2) },
    { new: true },
  );

  if (!cart) throw createHttpError(404, 'Cart not found');

  await User.findByIdAndUpdate(userId, { cart: cart._id }, { new: true });

  return cart;
};

export const cartCheckout = async (userId, data) => {
  const { name, email, phone, address, payment } = data;

  const result = await Cart.findOneAndUpdate(
    { userId },
    { name, email, phone, address, payment, isOrdered: true },
    { new: true },
  );

  return result;
};

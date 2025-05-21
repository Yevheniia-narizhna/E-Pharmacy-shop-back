import { User } from '../models/users.js';
import { Cart } from '../models/cart.js';
import { Product } from '../models/products.js';
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
    { name, email, phone, address, payment, isOrdered: true, products: [] },
    { new: true },
  );

  return result;
};

export const addToCart = async (userId, productId, quantity) => {
  if (!userId) throw createHttpError(400, 'User id is required');

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      products: [{ productId, quantity }],
    });
  } else {
    const existingProduct = cart.products.find(
      (product) => product.productId.toString() === productId,
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  }

  await cart.save();
  return cart;
};

export const decreaseQuantity = async (userId, productId, quantity) => {
  if (!userId) throw createHttpError(400, 'User id is required');

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      products: [{ productId, quantity }],
    });
  } else {
    const existingProduct = cart.products.find(
      (product) => product.productId.toString() === productId,
    );

    if (!existingProduct) {
      throw createHttpError(404, 'Product not found in cart');
    }

    if (existingProduct.quantity === 1) {
      // cart.products = cart.products.filter(
      //   (product) => product.productId.toString() !== productId,
      // );
      cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { products: { productId } } },
        { new: true },
      );
    } else {
      // existingProduct.quantity -= 1;
      await Cart.updateOne(
        { userId, 'products.productId': productId },
        { $inc: { 'products.$.quantity': -quantity } },
      );
      cart = await Cart.findOne({ userId });
    }
  }

  await cart.save();
  return cart;
};

export const removeFromCart = async (userId, productId) => {
  if (!userId) {
    throw createHttpError(400, 'User id is required');
  }

  if (!productId) {
    throw createHttpError(400, 'Product id is required');
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw createHttpError(404, 'Cart not found');
  }

  const found = cart.products.find(
    (item) => item.productId.toString() === productId,
  );

  if (!found) {
    throw createHttpError(404, 'There is no product with this id in the cart');
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { products: { productId } } },
    { new: true },
  );

  return updatedCart;
};

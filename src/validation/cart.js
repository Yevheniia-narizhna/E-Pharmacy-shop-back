import Joi from 'joi';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex =
  /^(\+?380|\+?38|\(?0)\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export const addToCartSchema = Joi.object({
  productId: Joi.string().required('Product id is required'),
  quantity: Joi.number().integer().required('Product quantity is required'),
});

export const decreaseQuantitySchema = Joi.object({
  productId: Joi.string().required('Product id is required'),
  quantity: Joi.number().integer().required('Product quantity is required'),
});

export const updateCartSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      }),
    )
    .min(1)
    .required(),
});

export const cartCheckSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(emailRegex).required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  address: Joi.string().required(),
  payment: Joi.string().valid('cash', 'bank').required(),
});

import createHttpError from 'http-errors';
import { Product } from '../models/products';

export const getAllProducts = async ({
  category,
  name,
  page = 1,
  limit = 12,
}) => {
  const skip = (page - 1) * limit;
  const filter = {};

  if (category) filter.category = category;
  if (name) filter.name = { $regex: new RegExp(name, 'i') };

  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / limit);
  const products = await Product.find(filter, '-createdAt -updatedAt', {
    skip,
    limit,
  });

  if (products.length === 0) {
    throw createHttpError(404, 'Not found');
  }

  return { currentPage: Number(page), totalPages, totalProducts, products };
};

export const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw createHttpError(404, 'Not found');
  }
  return product;
};

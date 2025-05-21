import createHttpError from 'http-errors';
import { Product } from '../models/products.js';

const DEFAULT_PHOTO =
  'https://www.agrolet.com.ua/wp-content/uploads/2023/01/404_agrolet_ukraine-2048x1365.jpg';

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
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

  const validatedProducts = products.map((product) => {
    if (!product.photo || !isValidUrl(product.photo)) {
      product.photo = DEFAULT_PHOTO;
    }
    return product;
  });

  return {
    currentPage: Number(page),
    totalPages,
    totalProducts,
    products: validatedProducts,
  };
};

export const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw createHttpError(404, 'Not found');
  }
  return product;
};

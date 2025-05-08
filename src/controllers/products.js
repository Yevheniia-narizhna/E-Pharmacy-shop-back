import { getAllProducts, getProductById } from '../services/products';

export const getAllProductsContr = async (req, res, next) => {
  try {
    const data = await getAllProducts(req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getProductByIdContr = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

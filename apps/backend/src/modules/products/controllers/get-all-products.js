import { Product } from '#model/products.js';
import { log } from '#utils/log.js';

export async function getAllProducts(req, res) {
  try {
    const allProducts = await Product.find({});

    return res.status(200).json({
      data: allProducts,
    });
  } catch (error) {
    log('getAllProducts', error);

    return res.status(400).json({
      message: error?.message ?? 'Something went wrong retrieving all products.',
    });
  }
}

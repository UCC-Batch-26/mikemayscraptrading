import { Product } from '../model/product.js';
import { log } from '#utils/log.js';

export async function getProduct(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).orFail();

    return res.status(200).json(product);
  } catch (error) {
    log('getProduct', 'Unable to retrieve Product:', error);

    let statusCode = 400;

    if (error.name === 'DocumentNotFoundError') {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      error: error?.message ?? 'Unable to retrieve Product.',
    });
  }
}

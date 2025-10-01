import { Product } from '#model/products.js';
import { log } from '#utils/log.js';

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id).orFail();

    return res.status(200).json({
      message: 'Product successfully deleted',
    });
  } catch (error) {
    log('deleteProduct', 'Error deleting product:', error);

    if (error.name === 'DocumentNotFoundError') {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.status(400).json({
      message: error?.message ?? 'Something went wrong while deleting the product.',
    });
  }
}

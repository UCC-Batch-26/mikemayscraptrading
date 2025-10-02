import { Product } from '#modules/products/models/product.js';
import { log } from '#utils/log.js';

export async function editProduct(req, res) {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.updateData, {
      new: true,
      runValidators: true,
    }).orFail();

    return res.status(200).json({
      message: 'Successfully updated product',
      data: updatedProduct,
    });
  } catch (error) {
    log('editProduct', 'Error updating product:', error);

    if (error.name === 'DocumentNotFoundError') {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.status(400).json({
      message: error?.message ?? 'Something went wrong while updating the product.',
    });
  }
}

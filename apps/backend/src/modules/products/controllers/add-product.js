import { Product } from '#model/products.js';
import { log } from '#utils/log.js';

export async function addProduct(req, res) {
  try {
    const { name, image, category, purchasePrice, sellingPrice, quantity, unit, description } = req.body;
    const product = await Product.create({
      name,
      image,
      category,
      purchasePrice,
      sellingPrice,
      quantity,
      unit,
      description,
    });

    return res.status(201).json({
      message: 'Successfully created product',
      data: product,
    });
  } catch (error) {
    log('addProduct', 'Error creating product:', error);

    return res.status(400).json({
      message: error?.message ?? 'Something went wrong while creating the product',
    });
  }
}

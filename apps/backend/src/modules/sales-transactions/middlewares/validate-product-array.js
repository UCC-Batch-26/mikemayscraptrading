export function validateProductArrayExists(req, res, next) {
  const { product } = req.body;

  if (!Array.isArray(product) || product.length === 0) {
    return res.status(400).json({
      message: "Product array is required and cannot be empty.",
    });
  }

  next();
}

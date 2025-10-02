export function validateProductArray(req, res, next) {
  const { products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({
      message: 'The products array is required and cannot be empty.',
    });
  }

  next();
}

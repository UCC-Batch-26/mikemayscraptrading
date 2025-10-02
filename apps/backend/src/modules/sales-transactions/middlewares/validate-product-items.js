export function validateProductItems(req, res, next) {
  const { products } = req.body;

  for (const item of products) {
    if (!item.productId) {
      return res.status(400).json({
        message: 'Each product must have a productId.,',
      });
    }

    if (typeof item.quantity !== 'number' || item.quantity <= 0 || !Number.isFinite(item.quantity)) {
      return res.status(400).json({
        message: 'Each product must have a valid, positive quantity.',
      });
    }
  }

  next();
}

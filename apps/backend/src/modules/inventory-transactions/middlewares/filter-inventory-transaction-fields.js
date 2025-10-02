export function filterInventoryTransactionFields(req, res, next) {
  const allowedFields = ['transactionType', 'quantityChange'];

  const updateData = Object.fromEntries(
    allowedFields.filter((field) => req.body[field] !== undefined).map((field) => [field, req.body[field]]),
  );

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: 'No valid fields provided for update.',
    });
  }

  req.updateData = updateData;
  next();
}

export function filterUpdateFields(req, res, next) {
  const allowedFields = [
    'name',
    'image',
    'category',
    'purchasePrice',
    'sellingPrice',
    'quantity',
    'unit',
    'description',
  ];

  const updateData = Object.fromEntries(
    allowedFields.filter((field) => req.body[field] !== undefined)
    .map((field) => [field, req.body[field]]),
  );

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: 'No valid fields provided for update.',
    });
  }

  req.updateData = updateData;
  next();
}
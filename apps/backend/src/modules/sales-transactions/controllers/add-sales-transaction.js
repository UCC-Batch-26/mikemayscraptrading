import { salesTransaction } from '#sales-transactions/models/sales-transaction.js';
import { log } from '#utils/log.js';

export async function addSalesTransaction(req, res) {
  try {
    const { products } = req.body;

    const transaction = await salesTransaction.create({ products });

    return res.status(201).json({
      message: 'Sales transaction created successfully.',
      data: transaction,
    });
  } catch (error) {
    log('addSalesTransaction', 'Error creating sales transaction:', error);

    return res.status(500).json({
      message: error?.message ?? 'Something went wrong while creating the sales transaction.',
    });
  }
}

import { salesTransaction } from '#sales-transactions/models/sales-transaction.js';
import { log } from '#utils/log.js';

export async function getAllSalesTransactions(req, res) {
  try {
    const allSalesTransactions = await salesTransaction.find({});

    return res.status(200).json({
      data: allSalesTransactions,
    });
  } catch (error) {
    log('getAllSalesTransactions', error);

    return res.status(400).json({
      message: error?.message ?? 'Something went wrong retrieving all samples',
    });
  }
}
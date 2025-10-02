import { salesTransaction } from '#modules/sales-transactions/models/sales-transaction.js';
import { log } from '#utils/log.js';

export async function getSaleTransaction(req, res) {
  const { id } = req.params;

  try {
    const saleTransaction = await salesTransaction.findById(id).orFail();

    return res.status(200).json({
      message: 'Successfully retrieved sale transaction',
      data: saleTransaction,
    });
  } catch (error) {
    log('getSaleTransaction', 'Unable to retrieve sale transaction:', error);

    let statusCode = 400;

    if (error.name === 'DocumentNotFoundError') {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      error: error?.message ?? 'Unable to retrieve sale transaction',
    });
  }
}

import { SalesTransaction } from '#modules/sales-transactions/models/sales-transaction.js';
import { log } from '#utils/log.js';

export async function getSalesTransaction(req, res) {
  const { id } = req.params;

  try {
    const salesTransaction = await SalesTransaction.findById(id).orFail();

    return res.status(200).json({
      message: 'Successfully retrieved sale transaction',
      data: salesTransaction,
    });
  } catch (error) {
    log('getSalesTransaction', 'Unable to retrieve sale transaction:', error);

    let statusCode = 400;

    if (error.name === 'DocumentNotFoundError') {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      error: error?.message ?? 'Unable to retrieve sale transaction',
    });
  }
}

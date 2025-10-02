import { salesTransaction } from "#sales-transactions/models/sales-transaction.js";
import { log } from "#utils/log.js";

export async function deleteSalesTransaction(req, res) {
  const { id } = req.params;

  try {
    const deletedTransaction = await salesTransaction.findByIdAndDelete(id).orFail();

    return res.status(200).json({
      message: "Sales transaction deleted successfully.",
      data: deletedTransaction,
    });
  } catch (error) {
    log("deleteSalesTransaction", "Error deleting sales transaction:", error);

    let status = 400;
    if (error.name === "DocumentNotFoundError") status = 404;

    return res.status(status).json({
      message: error?.message ?? "Failed to delete sales transaction.",
    });
  }
}

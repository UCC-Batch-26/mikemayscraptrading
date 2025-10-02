import { salesTransaction } from "#sales-transactions/models/sales-transaction.js";
import { log } from "#utils/log.js";

export async function editSalesTransaction(req, res) {
  const { id } = req.params;
  const { products } = req.body;

  try {
    const updatedTransaction = await salesTransaction.findByIdAndUpdate(
      id,
      { products },
      { new: true, runValidators: true }
    ).orFail();

    return res.status(200).json({
      message: "Sales transaction updated successfully.",
      data: updatedTransaction,
    });
  } catch (error) {
    log("editSalesTransaction", "Error updating sales transaction:", error);

    let status = 400;
    if (error.name === "DocumentNotFoundError") status = 404;

    return res.status(status).json({
      message: error?.message ?? "Failed to update sales transaction.",
    });
  }
}

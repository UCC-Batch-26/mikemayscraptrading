import { deleteSalesTransaction } from '#modules/sales-transactions/controllers/delete-sales-transaction.js';
import { SalesTransaction } from '#modules/sales-transactions/models/sales-transaction.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('deleteSalesTransaction Controller', () => {
  const ROUTE = {
    path: '/sales/:id',
    method: 'DELETE',
  };

  let product;
  let transaction;

  beforeEach(async () => {
    await SalesTransaction.deleteMany({});
    await Product.deleteMany({});

    product = await Product.create({
      name: 'Brass Scrap',
      image: 'https://example.com/brass.jpg',
      category: 'Metal',
      purchasePrice: 8,
      sellingPrice: 13,
      quantity: 100,
      unit: 'kgs',
      description: 'Scrap brass material',
    });

    transaction = await SalesTransaction.create({
      products: [{ productId: product._id, quantity: 20 }],
    });

    product.quantity -= 20;
    await product.save();
  });

  it('should delete the transaction and restore product quantity', async () => {
    const response = await createTestServer(ROUTE, deleteSalesTransaction)
      .delete(`/sales/${transaction._id}`);

    const updatedProduct = await Product.findById(product._id);
    const deleted = await SalesTransaction.findById(transaction._id);

    expect(response.status).toBe(200);
    expect(response.body.message).toContain('deleted successfully');
    expect(updatedProduct.quantity).toBe(100);
    expect(deleted).toBeNull();
  });

  it('should return 404 if transaction not found', async () => {
    const fakeId = '652ffbe1e173ab7c7f000000';

    const response = await createTestServer(ROUTE, deleteSalesTransaction)
      .delete(`/sales/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBeTruthy();
  });

  it('should return 400 for invalid ID format', async () => {
    const response = await createTestServer(ROUTE, deleteSalesTransaction)
      .delete('/sales/invalid-id');

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });
});

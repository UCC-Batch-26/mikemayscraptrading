import { getSalesTransaction } from '#modules/sales-transactions/controllers/get-sales-transaction.js';
import { SalesTransaction } from '#modules/sales-transactions/models/sales-transaction.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('getSaleTransaction Controller', () => {
  const ROUTE = {
    path: '/sales/:id',
    method: 'GET',
  };

  let product;
  let transaction;

  beforeEach(async () => {
    await SalesTransaction.deleteMany({});
    await Product.deleteMany({});

    product = await Product.create({
      name: 'Steel Scrap',
      image: 'https://example.com/steel.jpg',
      category: 'Metal',
      purchasePrice: 12,
      sellingPrice: 18,
      quantity: 100,
      unit: 'kgs',
      description: 'Clean steel scrap',
    });

    transaction = await SalesTransaction.create({
      products: [{ productId: product._id, quantity: 30 }],
    });
  });

  it('should return a single sales transaction', async () => {
    const response = await createTestServer(ROUTE, getSalesTransaction).get(`/sales/${transaction._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Successfully retrieved sale transaction');
    expect(response.body.data._id).toBe(transaction._id.toString());
  });

  it('should return 404 for non-existent transaction', async () => {
    const fakeId = '652ffbe1e173ab7c7f000000';

    const response = await createTestServer(ROUTE, getSalesTransaction).get(`/sales/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });

  it('should return 400 for invalid ID', async () => {
    const response = await createTestServer(ROUTE, getSalesTransaction).get('/sales/invalid-id');

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

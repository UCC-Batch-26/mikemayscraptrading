import { getAllSalesTransactions } from '#modules/sales-transactions/controllers/get-all-sales-transactions.js';
import { SalesTransaction } from '#modules/sales-transactions/models/sales-transaction.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('getAllSalesTransactions Controller', () => {
  const ROUTE = {
    path: '/sales',
    method: 'GET',
  };

  let product;

  beforeEach(async () => {
    await SalesTransaction.deleteMany({});
    await Product.deleteMany({});

    product = await Product.create({
      name: 'Copper Scrap',
      image: 'https://example.com/copper.jpg',
      category: 'Metal',
      purchasePrice: 10,
      sellingPrice: 15,
      quantity: 100,
      unit: 'kgs',
      description: 'Recycled copper scrap',
    });

    await SalesTransaction.create({
      products: [{ productId: product._id, quantity: 10 }],
    });

    await SalesTransaction.create({
      products: [{ productId: product._id, quantity: 20 }],
    });
  });

  it('should return all sales transactions', async () => {
    const response = await createTestServer(ROUTE, getAllSalesTransactions)
      .get(ROUTE.path);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(2);
  });
});

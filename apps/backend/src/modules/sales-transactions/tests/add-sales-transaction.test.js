import { addSalesTransaction } from '#modules/sales-transactions/controllers/add-sales-transaction.js';
import { SalesTransaction } from '#modules/sales-transactions/models/sales-transaction.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('addSalesTransaction Controller', () => {
  const ROUTE = {
    path: '/sales',
    method: 'POST',
  };

  let product;

  beforeEach(async () => {
    await SalesTransaction.deleteMany({});
    await Product.deleteMany({});

    product = await Product.create({
      name: 'Test Product',
      image: 'https://example.com/image.jpg',
      category: 'Test',
      purchasePrice: 10,
      sellingPrice: 20,
      quantity: 100,
      unit: 'pcs',
      description: 'Test product',
    });
  });

  it('should create a sales transaction and update product quantity', async () => {
    const data = {
      products: [
        {
          productId: product._id.toString(),
          quantity: 10,
        },
      ],
    };

    const response = await createTestServer(ROUTE, addSalesTransaction).post(ROUTE.path).send(data);

    const updatedProduct = await Product.findById(product._id);
    const createdTransaction = await SalesTransaction.findOne();

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Sales transaction created successfully and product quantities updated.');
    expect(updatedProduct.quantity).toBe(90);
    expect(createdTransaction.products[0].productId.toString()).toBe(product._id.toString());
    expect(createdTransaction.products[0].quantity).toBe(10);
  });

  it('should return 400 if product does not exist', async () => {
    const data = {
      products: [
        {
          productId: '652ffbe1e173ab7c7f000000',
          quantity: 5,
        },
      ],
    };

    const response = await createTestServer(ROUTE, addSalesTransaction).post(ROUTE.path).send(data);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('not found');
  });

  it('should return 400 if insufficient product quantity', async () => {
    const data = {
      products: [
        {
          productId: product._id.toString(),
          quantity: 200,
        },
      ],
    };

    const response = await createTestServer(ROUTE, addSalesTransaction).post(ROUTE.path).send(data);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Insufficient quantity');
  });
});

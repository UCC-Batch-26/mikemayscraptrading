import { editSalesTransaction } from '#modules/sales-transactions/controllers/edit-sales-transaction.js';
import { SalesTransaction } from '#modules/sales-transactions/models/sales-transaction.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { describe, it, expect, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

describe('editSalesTransaction Controller', () => {
  const ROUTE = {
    path: '/sales/:id',
    method: 'PUT',
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

  it('should update sales transaction and adjust product quantities', async () => {
    const updatedProducts = [{ productId: product._id, quantity: 20 }];

    const response = await createTestServer(ROUTE, editSalesTransaction)
      .put(`/sales/${transaction._id}`)
      .send({ products: updatedProducts });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Sales transaction updated successfully and product quantities adjusted.');
    expect(response.body.data.products[0].quantity).toBe(20);

    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.quantity).toBe(110);
  });

  it('should return 400 if product not found', async () => {
    const invalidProductId = faker.database.mongodbObjectId();

    const response = await createTestServer(ROUTE, editSalesTransaction)
      .put(`/sales/${transaction._id}`)
      .send({ products: [{ productId: invalidProductId, quantity: 5 }] });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Product with ID ${invalidProductId} not found.`);
  });

  it('should return 400 if product quantity is insufficient', async () => {
    const response = await createTestServer(ROUTE, editSalesTransaction)
      .put(`/sales/${transaction._id}`)
      .send({ products: [{ productId: product._id, quantity: 200 }] });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Insufficient quantity for product ${product.name}.`);
  });

  it('should return 404 if transaction not found', async () => {
    const fakeId = faker.database.mongodbObjectId();

    const response = await createTestServer(ROUTE, editSalesTransaction)
      .put(`/sales/${fakeId}`)
      .send({ products: [{ productId: product._id, quantity: 10 }] });

    expect(response.status).toBe(404);
  });
});

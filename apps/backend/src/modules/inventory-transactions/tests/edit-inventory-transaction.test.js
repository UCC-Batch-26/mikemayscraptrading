import { editInventoryTransaction } from '#modules/inventory-transactions/controllers/edit-inventory-transaction.js';
import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { describe, it, expect, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

describe('editInventoryTransaction Controller', () => {
  const ROUTE = {
    path: '/inventory/:id',
    method: 'PUT',
  };

  let product;
  let transaction;

  beforeEach(async () => {
    await InventoryTransaction.deleteMany({});
    await Product.deleteMany({});

    product = await Product.create({
      name: 'Copper Wire',
      image: 'https://example.com/copper.jpg',
      category: 'Metal',
      purchasePrice: 15,
      sellingPrice: 25,
      quantity: 100,
      unit: 'pcs',
      description: 'High quality copper wire',
    });

    transaction = await InventoryTransaction.create({
      productId: product._id,
      transactionType: 'In',
      quantityChange: 30,
    });
  });

  it('should update inventory transaction and adjust product quantity (In)', async () => {
    const updateData = {
      transactionType: 'In',
      quantityChange: 20,
    };

    const response = await createTestServer(ROUTE, (req, res) => {
      req.updateData = updateData;
      return editInventoryTransaction(req, res);
    })
      .put(`/inventory/${transaction._id}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Successfully updated inventory transaction');
    expect(response.body.data.quantityChange).toBe(20);

    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.quantity).toBe(90); // 100 - 30 (old in) + 20 (new in) = 90
  });

  it('should update inventory transaction and adjust product quantity (Out)', async () => {
    const outTransaction = await InventoryTransaction.create({
      productId: product._id,
      transactionType: 'Out',
      quantityChange: 10,
    });

    const updateData = {
      transactionType: 'Out',
      quantityChange: 5,
    };

    const response = await createTestServer(ROUTE, (req, res) => {
      req.updateData = updateData;
      return editInventoryTransaction(req, res);
    })
      .put(`/inventory/${outTransaction._id}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Successfully updated inventory transaction');
    expect(response.body.data.quantityChange).toBe(5);

    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.quantity).toBe(105); // 100 + 10 (old out reversed) - 5 (new out) = 105
  });

  it('should return 404 if transaction not found', async () => {
    const fakeId = faker.database.mongodbObjectId();

    const updateData = {
      transactionType: 'In',
      quantityChange: 10,
    };

    const response = await createTestServer(ROUTE, (req, res) => {
      req.updateData = updateData;
      return editInventoryTransaction(req, res);
    })
      .put(`/inventory/${fakeId}`)
      .send(updateData);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });

  it('should return 400 on other errors', async () => {
    // Send invalid updateData to cause validation failure or error
    const updateData = {
      transactionType: 'InvalidType',
      quantityChange: -5,
    };

    const response = await createTestServer(ROUTE, (req, res) => {
      req.updateData = updateData;
      return editInventoryTransaction(req, res);
    })
      .put(`/inventory/${transaction._id}`)
      .send(updateData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

import { addInventoryTransaction } from '#modules/inventory-transactions/controllers/add-inventory-transaction.js';
import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { describe, expect, it, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

describe('addInventoryTransaction Controller', () => {
  const ROUTE = {
    path: '/inventory',
    method: 'POST',
  };

  beforeEach(async () => {
    await InventoryTransaction.deleteMany({});
    await Product.deleteMany({});
  });

  it('should create an inventory transaction and update product quantity (In)', async () => {
    const initialQuantity = 100;

    const product = await Product.create({
      name: faker.commerce.productName().slice(0, 20),
      image: faker.image.url(),
      category: 'Test',
      purchasePrice: 10,
      sellingPrice: 20,
      quantity: initialQuantity,
      unit: 'pcs',
      description: 'Test product',
    });

    const transactionData = {
      productId: product._id.toString(),
      transactionType: 'In',
      quantityChange: 50,
    };

    const response = await createTestServer(ROUTE, addInventoryTransaction)
      .post(ROUTE.path)
      .send(transactionData);

    const updatedProduct = await Product.findById(product._id);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Successfully created inventory transaction and updated product quantity');
    expect(response.body.data.productId).toBe(transactionData.productId);
    expect(updatedProduct.quantity).toBe(initialQuantity + transactionData.quantityChange);
  });

  it('should return 400 when required fields are missing', async () => {
    const response = await createTestServer(ROUTE, addInventoryTransaction)
      .post(ROUTE.path)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });
});

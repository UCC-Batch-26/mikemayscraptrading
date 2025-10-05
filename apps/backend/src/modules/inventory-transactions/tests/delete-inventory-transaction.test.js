import { deleteInventoryTransaction } from '#modules/inventory-transactions/controllers/delete-inventory-transaction.js';
import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { faker } from '@faker-js/faker';
import { describe, it, expect, beforeEach } from 'vitest';

describe('deleteInventoryTransaction Controller', () => {
  const ROUTE = {
    path: '/inventory-transactions/:id',
    method: 'DELETE',
  };

  let product;
  let existingTransaction;

  beforeEach(async () => {
    await InventoryTransaction.deleteMany({});
    await Product.deleteMany({});

    product = await Product.create({
      name: 'Test Product',
      image: faker.image.url(),
      category: 'Test',
      purchasePrice: 10,
      sellingPrice: 20,
      quantity: 100,
      unit: 'pcs',
      description: 'Test product',
    });

    existingTransaction = await InventoryTransaction.create({
      productId: product._id,
      transactionType: 'In',
      quantityChange: 15,
    });

    product.quantity += 15;
    await product.save();
  });

  it('should delete an existing inventory transaction and reverse product quantity change', async () => {
    const response = await createTestServer(ROUTE, deleteInventoryTransaction).delete(
      `/inventory-transactions/${existingTransaction._id}`,
    );

    const updatedProduct = await Product.findById(product._id);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Successfully deleted inventory transaction and updated product quantity');
    expect(response.body.data._id).toBe(existingTransaction._id.toString());
    expect(updatedProduct.quantity).toBe(100);
  });

  it('should return 404 when inventory transaction does not exist', async () => {
    const fakeId = faker.database.mongodbObjectId();

    const response = await createTestServer(ROUTE, deleteInventoryTransaction).delete(
      `/inventory-transactions/${fakeId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });

  it('should return 400 on invalid id format', async () => {
    const invalidId = 'invalid-id';

    const response = await createTestServer(ROUTE, deleteInventoryTransaction).delete(
      `/inventory-transactions/${invalidId}`,
    );

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

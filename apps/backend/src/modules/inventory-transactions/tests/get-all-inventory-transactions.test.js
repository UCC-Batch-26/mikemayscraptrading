import { getAllInventoryTransactions } from '#modules/inventory-transactions/controllers/get-all-inventory-transactions.js';
import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { createTestServer } from '#tests/test-utils.js';
import { faker } from '@faker-js/faker';
import { describe, it, expect, beforeEach } from 'vitest';

describe('getAllInventoryTransactions Controller', () => {
  const ROUTE = {
    path: '/inventory-transactions',
    method: 'GET',
  };

  beforeEach(async () => {
    await InventoryTransaction.deleteMany({});
  });

  it('should return all inventory transactions', async () => {
    const sampleTransactions = [
      {
        productId: faker.database.mongodbObjectId(),
        transactionType: 'In',
        quantityChange: 10,
      },
      {
        productId: faker.database.mongodbObjectId(),
        transactionType: 'Out',
        quantityChange: 5,
      },
    ];

    await InventoryTransaction.insertMany(sampleTransactions);

    const response = await createTestServer(ROUTE, getAllInventoryTransactions).get(ROUTE.path);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(response.body.data[0].transactionType).toBe(sampleTransactions[0].transactionType);
    expect(response.body.data[1].quantityChange).toBe(sampleTransactions[1].quantityChange);
  });

  it('should return 400 on error', async () => {
    // Simulate error by mocking InventoryTransaction.find to throw
    const originalFind = InventoryTransaction.find;
    InventoryTransaction.find = () => {
      throw new Error('Forced error');
    };

    const response = await createTestServer(ROUTE, getAllInventoryTransactions).get(ROUTE.path);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Forced error');

    InventoryTransaction.find = originalFind;
  });
});

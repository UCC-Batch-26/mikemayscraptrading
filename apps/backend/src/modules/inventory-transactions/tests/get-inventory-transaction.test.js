import { getInventoryTransaction } from '#modules/inventory-transactions/controllers/get-inventory-transaction.js';
import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { createTestServer } from '#tests/test-utils.js';
import { faker } from '@faker-js/faker';
import { describe, it, expect, beforeEach } from 'vitest';

describe('getInventoryTransaction Controller', () => {
  const ROUTE = {
    path: '/inventory-transactions/:id',
    method: 'GET',
  };

  let existingTransaction;

  beforeEach(async () => {
    await InventoryTransaction.deleteMany({});

    existingTransaction = await InventoryTransaction.create({
      productId: faker.database.mongodbObjectId(),
      transactionType: 'In',
      quantityChange: 10,
    });
  });

  it('should retrieve an inventory transaction successfully', async () => {
    const response = await createTestServer(ROUTE, getInventoryTransaction)
      .get(`/inventory-transactions/${existingTransaction._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Successfully retrieved inventory transaction');
    expect(response.body.data._id).toBe(existingTransaction._id.toString());
  });

  it('should return 404 when inventory transaction does not exist', async () => {
    const fakeId = faker.database.mongodbObjectId();

    const response = await createTestServer(ROUTE, getInventoryTransaction)
      .get(`/inventory-transactions/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });

  it('should return 400 on invalid id format', async () => {
    const invalidId = '123';

    const response = await createTestServer(ROUTE, getInventoryTransaction)
      .get(`/inventory-transactions/${invalidId}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

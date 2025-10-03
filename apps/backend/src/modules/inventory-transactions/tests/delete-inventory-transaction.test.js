import { deleteInventoryTransaction } from '#modules/inventory-transactions/controllers/delete-inventory-transaction.js';
import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { createTestServer } from '#tests/test-utils.js';
import { faker } from '@faker-js/faker';
import { describe, it, expect, beforeEach } from 'vitest';

describe('deleteInventoryTransaction Controller', () => {
  const ROUTE = {
    path: '/inventory-transactions/:id',
    method: 'DELETE',
  };

  let existingTransaction;

  beforeEach(async () => {
    await InventoryTransaction.deleteMany({});

    existingTransaction = await InventoryTransaction.create({
      productId: faker.database.mongodbObjectId(),
      transactionType: 'In',
      quantityChange: 15,
    });
  });

  it('should delete an existing inventory transaction successfully', async () => {
    const response = await createTestServer(ROUTE, deleteInventoryTransaction)
      .delete(`/inventory-transactions/${existingTransaction._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Successfully deleted inventory transaction');
    expect(response.body.data._id).toBe(existingTransaction._id.toString());
  });

  it('should return 404 when inventory transaction does not exist', async () => {
    const fakeId = faker.database.mongodbObjectId();

    const response = await createTestServer(ROUTE, deleteInventoryTransaction)
      .delete(`/inventory-transactions/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });

  it('should return 400 on invalid id format', async () => {
    const invalidId = 'invalid-id';

    const response = await createTestServer(ROUTE, deleteInventoryTransaction)
      .delete(`/inventory-transactions/${invalidId}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

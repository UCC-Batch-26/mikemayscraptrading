import { addInventoryTransaction } from '#modules/inventory-transactions/controllers/add-inventory-transaction.js';
import { InventoryTransaction } from '#modules/inventory-transactions/models/inventory-transactions.js';
import { createTestServer } from '#tests/test-utils.js';
import { describe, expect, it, beforeEach } from 'vitest';

describe('addInventoryTransaction Controller', () => {
  const ROUTE = {
    path: '/inventory',
    method: 'POST',
  };

  beforeEach(async () => {
    await InventoryTransaction.deleteMany({});
  });

  it('should create an inventory transaction successfully', async () => {
    const transactionData = {
      transactionType: 'In',
      quantityChange: 50,
    };

    const response = await createTestServer(ROUTE, addInventoryTransaction)
      .post(ROUTE.path)
      .send(transactionData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Successfully created inventory transaction');
    expect(response.body.data.transactionType).toBe(transactionData.transactionType);
    expect(response.body.data.quantityChange).toBe(transactionData.quantityChange);
  });

  it('should return 400 when required fields are missing', async () => {
    const response = await createTestServer(ROUTE, addInventoryTransaction)
      .post(ROUTE.path)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });
});

import { getProduct } from '#modules/products/controllers/get-product.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

describe('getProduct Controller', () => {
  const ROUTE = {
    path: '/products/:id',
    method: 'GET',
  };

  it('should display the specific product', async () => {
    const product = await Product.create({ name: faker.lorem.sentence() });
    const createdProductId = product._id.toString();
    const response = await createTestServer(ROUTE, getProduct).get(ROUTE.path.replace(':id', createdProductId));

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(createdProductId);
    expect(response.body.name).toBe(product.name);
  });

  it('should return 404 when not found', async () => {
    const response = await createTestServer(ROUTE, getProduct).get(
      ROUTE.path.replace(':id', faker.database.mongodbObjectId()),
    );

    expect(response.status).toBe(404);
  });

  it('should return 400 when invalid ID', async () => {
    const response = await createTestServer(ROUTE, getProduct).get(ROUTE.path.replace(':id', faker.string.uuid()));

    expect(response.status).toBe(400);
  });
});

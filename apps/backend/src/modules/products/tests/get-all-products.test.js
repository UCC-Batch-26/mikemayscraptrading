import { getAllProducts } from '#modules/products/controllers/get-all-products.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

describe('getAllproducts Controller', () => {
  const ROUTE = {
    path: '/products',
    method: 'GET',
  };

  it('should display all products', async () => {
    await Product.create([
      { name: faker.lorem.sentence() },
      { name: faker.lorem.sentence() },
      { name: faker.lorem.sentence() },
    ]);

    const response = await createTestServer(ROUTE, getAllproducts).get(ROUTE.path);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(3);
  });

  it('should display atleast 1 product', async () => {
    await Product.create({ name: faker.lorem.sentence() });
    const response = await createTestServer(ROUTE, getAllproducts).get(ROUTE.path);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

  it('should display an empty product', async () => {
    const response = await createTestServer(ROUTE, getAllproducts).get(ROUTE.path);

    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual([]);
  });
});

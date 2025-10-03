import { getAllProducts } from '#modules/products/controllers/get-all-products.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { faker } from '@faker-js/faker';
import { describe, expect, it, beforeEach } from 'vitest';

describe('getAllProducts Controller', () => {
  const ROUTE = {
    path: '/products',
    method: 'GET',
  };

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  const createValidProduct = () => ({
    name: faker.commerce.productName().slice(0, 20), // truncate to max length 20
    category: 'Metal', // valid enum/category
    purchasePrice: 10,
    sellingPrice: 15,
    quantity: 100,
    unit: 'pcs', // valid enum value
    description: 'Sample product',
  });

  it('should display all products', async () => {
    await Product.create([createValidProduct(), createValidProduct(), createValidProduct()]);

    const response = await createTestServer(ROUTE, getAllProducts).get(ROUTE.path);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(3);
  });

  it('should display atleast 1 product', async () => {
    await Product.create(createValidProduct());

    const response = await createTestServer(ROUTE, getAllProducts).get(ROUTE.path);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

  it('should display an empty product list', async () => {
    const response = await createTestServer(ROUTE, getAllProducts).get(ROUTE.path);

    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual([]);
  });
});

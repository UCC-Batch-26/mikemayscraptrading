import { addProduct } from '#modules/products/controllers/add-product.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

describe('addProduct Controller', () => {
  const ROUTE = {
    path: '/products',
    method: 'POST',
  };

  const validProductData = {
    name: faker.commerce.productName().slice(0, 20),
    category: 'Metal',
    purchasePrice: 10,
    sellingPrice: 15,
    quantity: 100,
    unit: 'pcs',
    description: 'Sample product',
  };

  it('should create a new product successfully', async () => {
    const response = await createTestServer(ROUTE, addProduct).post(ROUTE.path).send(validProductData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Successfully created product');
    expect(response.body.data.name).toBe(validProductData.name);

    const responseProductId = response.body.data._id;
    const createdProduct = await Product.findById(responseProductId);

    expect(createdProduct).toBeTruthy();
    expect(createdProduct.name).toBe(validProductData.name);
  });

  it('should return 400 when name is missing', async () => {
    const response = await createTestServer(ROUTE, addProduct).post(ROUTE.path).send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });
});

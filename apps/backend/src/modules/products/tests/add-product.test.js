import { addProduct } from '#modules/products/controllers/add-product.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { describe, expect, it, beforeAll } from 'vitest';

describe('addProduct Controller', () => {
  const ROUTE = {
    path: '/products',
    method: 'POST'
  };

  it('should create a new product successfully', async () => {
    const productData = { name: faker.lorem.sentence() };
    const response = await createTestServer(ROUTE, addProduct).post(ROUTE.path).send(productData);
  
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Successfully created product');
    expect(response.body.data.name).toBe(productData.name);

    const responseProductId = response.body.data._id;
    expect(isValidObjectId(responseProductId)).toBeTruthy();

    // Verify integration
    const createdProduct = await Product.findById(responseProductId);
    expect(createdProduct).toBeTruthy();
    expect(createdProduct.name).toBe(productData.name);
  });

  it('should return 400 when name is missing', async () => {
    const response = await createTestServer(ROUTE, addProduct).post(ROUTE.path).send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });
});
    
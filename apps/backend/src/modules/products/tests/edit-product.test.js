import { editProduct } from '#modules/products/controllers/edit-product.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { faker } from '@faker-js/faker';
import { describe, it, expect, beforeEach } from 'vitest';

describe('editProduct Controller', () => {
  const ROUTE = {
    path: '/products/:id',
    method: 'PATCH',
  };

  let existingProduct;

  beforeEach(async () => {
    await Product.deleteMany({});
    existingProduct = await Product.create({
      name: faker.commerce.productName().slice(0, 20),
      category: 'Metal',
      purchasePrice: 10,
      sellingPrice: 15,
      quantity: 100,
      unit: 'kgs',
      description: 'Sample product',
    });
  });

  const middlewareInjectUpdateData = (req, _res, next) => {
    req.updateData = req.body;
    next();
  };

  it('should update an existing product successfully', async () => {
    const updateData = {
      name: 'Updated Product',
      sellingPrice: 20,
    };

    const response = await createTestServer(ROUTE, [middlewareInjectUpdateData, editProduct])
      .patch(`/products/${existingProduct._id}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Successfully updated product');
    expect(response.body.data.name).toBe(updateData.name);
    expect(response.body.data.sellingPrice).toBe(updateData.sellingPrice);
  });

  it('should return 404 when product does not exist', async () => {
    const fakeId = faker.database.mongodbObjectId();

    const response = await createTestServer(ROUTE, [middlewareInjectUpdateData, editProduct])
      .patch(`/products/${fakeId}`)
      .send({ name: 'New Name' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });

  it('should return 400 when invalid update is sent', async () => {
    const response = await createTestServer(ROUTE, [middlewareInjectUpdateData, editProduct])
      .patch(`/products/${existingProduct._id}`)
      .send({ sellingPrice: 'not-a-number' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });
});

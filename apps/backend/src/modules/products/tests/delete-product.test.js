import { deleteProduct } from '#modules/products/controllers/delete-product.js';
import { Product } from '#modules/products/models/product.js';
import { createTestServer } from '#tests/test-utils.js';
import { faker } from '@faker-js/faker';
import { describe, it, expect, beforeEach } from 'vitest';

describe('deleteProduct Controller', () => {
  const ROUTE = {
    path: '/products/:id',
    method: 'DELETE',
  };

  let product;

  beforeEach(async () => {
    await Product.deleteMany({});
    product = await Product.create({
      name: faker.commerce.productName().slice(0, 20),
      category: 'Metal',
      purchasePrice: 10,
      sellingPrice: 15,
      quantity: 100,
      unit: 'pcs',
      description: 'Sample product to delete',
    });
  });

  it('should delete the product successfully', async () => {
    const response = await createTestServer(ROUTE, deleteProduct).delete(`/products/${product._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product successfully deleted');

    const deleted = await Product.findById(product._id);
    expect(deleted).toBeNull();
  });

  it('should return 404 if product does not exist', async () => {
    const nonExistentId = faker.database.mongodbObjectId();

    const response = await createTestServer(ROUTE, deleteProduct).delete(`/products/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });

  it('should return 400 if ID is invalid', async () => {
    const response = await createTestServer(ROUTE, deleteProduct).delete('/products/invalid-id');

    expect(response.status).toBe(400);
    expect(response.body.message).toBeTruthy();
  });
});

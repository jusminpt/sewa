import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product('1', 'sku', 'Name', 'Description', 100, 'ImageUrl', true, 10, new Date(), null)).toBeTruthy();
  });
});

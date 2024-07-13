import { CartItem } from './cart-item';
import { Product } from './product';

describe('CartItem', () => {
  it('should create an instance', () => {
    const product = new Product('1', 'sku', 'Name', 'Description', 100, 'ImageUrl', true, 10, new Date(), null);
    expect(new CartItem(product)).toBeTruthy();
  });
});
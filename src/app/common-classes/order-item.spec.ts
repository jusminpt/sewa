import { OrderItem } from './order-item';
import { CartItem } from './cart-item';
import { Product } from './product';

describe('OrderItem', () => {
  it('should create an instance', () => {
    const product = new Product('1', 'sku', 'Name', 'Description', 100, 'ImageUrl', true, 10, new Date(), null);
    const cartItem = new CartItem(product);
    expect(new OrderItem(cartItem)).toBeTruthy();
  });
});

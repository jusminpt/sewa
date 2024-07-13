import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common-classes/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {
  cart_items: CartItem[] = [];
  cart_total_price: number = 0;
  cart_total_quantity: number = 0;

  constructor(private cartService: CartService) {

  }
  ngOnInit(): void {
    this.cartDetailsList();
  }

  cartDetailsList() {
    //get cart items
    this.cart_items = this.cartService.cart_items;

    //subscribe
    this.cartService.cart_total_price.subscribe(
      data => this.cart_total_price = data
    );
    this.cartService.cart_total_quantity.subscribe(
      data => this.cart_total_quantity = data
    );
    //calculate
    this.cartService.calculateCartTotal();
  }

  incrementQuantity(cart_item: CartItem) {
    this.cartService.addToCart(cart_item);
  }
  decrementQuantity(cart_item: CartItem) {
    this.cartService.removeItemInCart(cart_item);
  }
  remove(cart_item: CartItem) {
    this.cartService.removeCart(cart_item);
  }
}

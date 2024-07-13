import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit {
  total_price: number = 0.00;
  total_quantity: number = 0;

  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    //subscribe to cart service
    this.cartService.cart_total_price.subscribe(
      data => this.total_price = data
    );

    this.cartService.cart_total_quantity.subscribe(
      data => this.total_quantity = data
    );
  }
}

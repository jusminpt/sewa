import { Injectable } from '@angular/core';
import { CartItem } from '../common-classes/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart_items: CartItem[] = [];
  cart_total_price: Subject<number> = new BehaviorSubject<number>(0);
  cart_total_quantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cart_item: CartItem) {
    //check if item in cart
    let alreadyInCart: boolean = false;
    let existingInCartItem: CartItem = undefined;

    if (this.cart_items.length > 0) {
      //find item by item id
      existingInCartItem = this.cart_items.find(tempCartItem => tempCartItem.id === cart_item.id);
      //check if found
      alreadyInCart = (existingInCartItem != undefined);
    }

    if (alreadyInCart) {
      existingInCartItem.quantity++;
    } else {
      //add item to array
      this.cart_items.push(cart_item);
    }

    //compute cart total price
    this.calculateCartTotal();
  }

  calculateCartTotal() {
    let total_price: number = 0;
    let total_quantity: number = 0;

    for (let currentItem of this.cart_items) {
      total_price += currentItem.unit_price * currentItem.quantity;
      total_quantity += currentItem.quantity;
    }

    //publish/send new value for all subscribers
    this.cart_total_price.next(total_price);
    this.cart_total_quantity.next(total_quantity);

    this.logCartData(total_price, total_quantity);

  }

  logCartData(total_price: number, total_quantity: number) {
    console.log(`Contents of the cart`);
    for (let tempCartItem of this.cart_items) {
      const subTotal = tempCartItem.quantity * tempCartItem.unit_price;
      console.log(`Name: ${tempCartItem.name}, Price: ${tempCartItem.unit_price}, Quantity: ${tempCartItem.quantity}, Subtotal: ${subTotal}`);
    }

    console.log(`Total price: ${total_price.toFixed(2)}`);
    console.log(`Total quantity: ${total_quantity}`);
    console.log(`===========`)
  }


  removeItemInCart(cart_item: CartItem) {
    cart_item.quantity--;

    if (cart_item.quantity === 0) {
      this.removeCart(cart_item);
    } else {
      this.calculateCartTotal();
    }
  }
  removeCart(cart_item: CartItem) {
    //get index of item in cart array
    const item_index = this.cart_items.findIndex(tempCartItem => tempCartItem.id === cart_item.id);

    //if found
    if (item_index > -1) {
      this.cart_items.splice(item_index, 1);

      this.calculateCartTotal();
    }
  }
}

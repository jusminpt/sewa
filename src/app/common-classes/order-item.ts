import { CartItem } from "./cart-item";

export class OrderItem {
    image_url: string;
    unit_price: number;
    quantity: number;
    product_id: string;

    constructor(cartItem: CartItem) {
        this.image_url = cartItem.image_url;
        this.unit_price = cartItem.unit_price;
        this.quantity = cartItem.quantity;
        this.product_id = cartItem.id;
    }
}

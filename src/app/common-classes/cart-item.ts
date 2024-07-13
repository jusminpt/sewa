import { Product } from "./product";

export class CartItem {
    public id: string;
    public name: string;
    public unit_price: number;
    public image_url: string;
    public quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.unit_price = product.unit_price;
        this.image_url = product.image_url;
        this.quantity = 1;
    }
}

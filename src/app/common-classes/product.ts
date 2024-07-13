import { ProductCategory } from "./product-category";

export class Product {

    constructor(
        public id: string,
        public sku: string,
        public name: string,
        public description: string,
        public unit_price: number,
        public image_url: string,
        public active: boolean,
        public unit_in_stock: number,
        public date_created: Date,
        public date_last_updated: Date,
        public category: ProductCategory
    ) {

    }
}


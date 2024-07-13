import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common-classes/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common-classes/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(private productService: ProductService, private cartService: CartService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const product_id: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductDetails(product_id).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addToCart() {
    console.log(`Adding to cart: ${this.product.name}, Price: ${this.product.unit_price}`);

    const cart_item = new CartItem(this.product);
    this.cartService.addToCart(cart_item);
  }
}

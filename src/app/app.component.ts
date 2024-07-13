import { Component } from '@angular/core';
import { ProductCategory } from './common-classes/product-category';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-sewa-ecommerce';
  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  categories: ProductCategory[] = [];

  //inject service
  constructor(private productService: ProductService) {

  }

  //call service
  ngOnInit(): void {
    this.listCategory();
  }

  listCategory() {
    //invoke service
    this.productService.getCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.categories = data;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common-classes/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {

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

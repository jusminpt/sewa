import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../common-classes/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common-classes/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  current_category_Id: number = 1;
  previous_category_id: number = 1;
  current_category_name: string = "";
  searching_mode: boolean = false;
  page_number: number = 1;
  page_size: number = 8;
  page_total_elements: number = 0;
  previous_search_term: string = "";



  //inject productService
  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }

  //intregate service to angular components
  listProducts() {
    this.searching_mode = this.route.snapshot.paramMap.has('search-term');
    if (this.searching_mode) {
      this.handleSearchList();
    } else {
      this.handleCategoryList();

    }
  }
  handleSearchList() {
    const theSearch: string = this.route.snapshot.paramMap.get('search-term')!;

    //check if search term == previous or not
    if (this.previous_search_term != theSearch) {
      this.page_number = 1;
    }

    this.previous_search_term = theSearch;
    console.log(`Search term=${theSearch}, Page number:${this.page_number}, Page size:${this.page_size}`);

    //searching for product
    this.productService.searchProductsPaginate(this.page_number - 1, this.page_size, theSearch).subscribe(
      this.processData()
    );
  }

  handleCategoryList() {
    //check if category_id is present
    const is_category_id: boolean = this.route.snapshot.paramMap.has("id");

    if (is_category_id) {
      //convert id to number
      this.current_category_Id = +this.route.snapshot.paramMap.get("id")!;
      // get name param string
      this.current_category_name = this.route.snapshot.paramMap.get("name")!;
    } else {
      //set default categoty
      this.current_category_Id = 1;
      this.current_category_name = "Sneakers"
    }

    //check if category id == the previous id or not
    if (this.previous_category_id != this.current_category_Id) {
      this.page_number = 1;
    }

    this.previous_category_id = this.current_category_Id
    console.log(`Current cagetory id: ${this.current_category_Id}, Page number: ${this.page_number}, Page size: ${this.page_size}`);

    this.productService.getProductListPaginate(this.page_number - 1, this.page_size, this.current_category_Id).subscribe(
      this.processData()
    )
  }

  processData() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.page_number = data.page.number + 1;
      this.page_size = data.page.size;
      this.page_total_elements = data.page.totalElements;
    }
  }

  // add to product to cart
  addToCart(product_to_add: Product) {
    console.log(`Adding to cart: ${product_to_add.name}, Price: ${product_to_add.unit_price}`);

    const cart_item = new CartItem(product_to_add);
    this.cartService.addToCart(cart_item);
  }
}

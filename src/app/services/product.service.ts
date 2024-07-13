import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common-classes/product';
import { ProductCategory } from '../common-classes/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private base_url_endpoint = "https://sewa-app-1e033ac12cb0.herokuapp.com/api/products";
  private category_url_endpoint = "https://sewa-app-1e033ac12cb0.herokuapp.com/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getProductList(category_id: number): Observable<Product[]> {

    //build url base on category id
    const search_url = `${this.base_url_endpoint}/search/queryProductsByCategoryId?id=${category_id}`;

    return this.getProducts(search_url);
  }

  getProductListPaginate(thePage: number, thePageSize: number, category_id: number): Observable<GetResponse_products> {

    //build url base on category id, page and size
    const search_url = `${this.base_url_endpoint}/search/queryProductsByCategoryId?id=${category_id}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponse_products>(search_url);
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponse_categories>(this.category_url_endpoint).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductDetails(product_id: number): Observable<Product> {
    const product_url = `${this.base_url_endpoint}/${product_id}`;
    return this.httpClient.get<Product>(product_url);
  }

  searchProducts(theSearch: string): Observable<Product[]> {
    const search_url = `${this.base_url_endpoint}/search/queryProductsByNameContaining?name=${theSearch}`;

    return this.getProducts(search_url);
  }

  searchProductsPaginate(thePage: number, thePageSize: number, theSearch: string): Observable<GetResponse_products> {

    //build url base on the search term, page and size
    const search_url = `${this.base_url_endpoint}/search/queryProductsByNameContaining?name=${theSearch}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponse_products>(search_url);
  }


  private getProducts(search_url: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse_products>(search_url).pipe(
      map(response => response._embedded.products)
    );
  }
}

//add interface to help mapping: unwrapped json api
interface GetResponse_products {
  _embedded: {
    products: Product[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponse_categories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common-classes/product';
import { EMPTY, Observable, catchError, expand, map, throwError, toArray } from 'rxjs';
import { ProductCategory } from '../common-classes/product-category';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private base_url_endpoint = 'https://sewa-app-1e033ac12cb0.herokuapp.com/api/products';
  private category_url_endpoint = "https://sewa-app-1e033ac12cb0.herokuapp.com/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponse_categories>(this.category_url_endpoint).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    let page = 0;
    const pageSize = 20;

    return this.getProductsPage(page, pageSize).pipe(
      expand(response => {
        if (response.page.number < response.page.totalPages - 1) {
          page++;
          return this.getProductsPage(page, pageSize);
        } else {
          return EMPTY;
        }
      }),
      map(response => response._embedded.products),
      toArray(),
      map(pages => pages.flat()) // Flatten the array of arrays
    );
  }

  saveNewProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.base_url_endpoint}/save`, product).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`;
    }

    return throwError(errorMessage);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.base_url_endpoint}/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<void> {
    const deleteUrl = `${this.base_url_endpoint}/${productId}`;
    return this.httpClient.delete<void>(deleteUrl);
  }

  private getProductsPage(page: number, size: number): Observable<GetResponse_products> {
    const url = `${this.base_url_endpoint}?page=${page}&size=${size}`;
    return this.httpClient.get<GetResponse_products>(url);
  }
}

interface GetResponse_products {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponse_categories {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

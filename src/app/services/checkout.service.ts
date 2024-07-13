import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common-classes/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchase_url = "https://sewa-app-1e033ac12cb0.herokuapp.com/api/checkout/purchase";

  constructor(private httpClient: HttpClient) { }
  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchase_url, purchase);
  }
}

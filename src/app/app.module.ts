import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListAdminComponent } from './components/product-list-admin/product-list-admin.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';


//define routes
const routes: Routes = [
  { path: "checkout", component: CheckoutComponent },
  { path: "cart-details", component: CartDetailsComponent },
  { path: "products/:id", component: ProductDetailsComponent },
  { path: "search/:search-term", component: ProductListComponent },
  { path: "category/:id/:name", component: ProductListComponent },
  { path: "category", component: ProductListComponent },
  { path: 'login', component: LoginAdminComponent },
  { path: "products-admin", component: ProductListAdminComponent },
  { path: "products", component: ProductListComponent },
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "**", redirectTo: "/products", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    ProductListAdminComponent,
    LoginAdminComponent,
  ],
  imports: [
    //configure router
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

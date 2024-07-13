import { Component, OnInit } from '@angular/core';
import { Product } from '../../common-classes/product';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckoutValidators } from '../../validators/checkout-validators';
import { ProductCategory } from '../../common-classes/product-category';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrl: './product-list-admin.component.css'
})
export class ProductListAdminComponent implements OnInit {
  products: Product[] = [];
  categories: ProductCategory[] = [];
  addProduct_form_group: FormGroup;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    //Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      this.router.navigate(['/login']);
      return;
    }

    this.getAllProducts();
    this.getProductCategories();

    this.addProduct_form_group = this.formBuilder.group({
      product: this.formBuilder.group({
        sku: new FormControl("", [Validators.required, CheckoutValidators.isOnlyWhiteSpace]),
        name: new FormControl("", [Validators.required, CheckoutValidators.isOnlyWhiteSpace]),
        description: new FormControl("", [Validators.required, CheckoutValidators.isOnlyWhiteSpace]),
        unit_price: new FormControl("", [Validators.required, Validators.pattern("[0-9]*")]),
        image_url: new FormControl("assets/images/products/placeholder.png"),
        active: new FormControl(true),
        unit_in_stock: new FormControl("", [Validators.required, Validators.pattern("[0-9]*")]),
        date_created: new FormControl(new Date()),
        date_last_updated: new FormControl(null),
        category_id: new FormControl("", [Validators.required])
      })
    });
  }

  getAllProducts() {
    this.adminService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
        // Handle error as needed
      }
    );
  }

  getProductCategories() {
    this.adminService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching products', error);
        // Handle error as needed
      }
    );
  }

  saveUpdateProduct(product: Product) {
    this.adminService.updateProduct(product).subscribe(
      (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        alert('Product updated successfully!');
        this.getAllProducts(); // Refresh the product list to reflect changes
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  deleteProduct(productId: any) {
    console.log('Deleting product with ID:', productId);
    this.adminService.deleteProduct(productId).subscribe(
      () => {
        console.log('Product deleted successfully');
        alert('Product deleted successfully!');
        this.getAllProducts(); // Refresh the product list
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  get sku() { return this.addProduct_form_group.get('product.sku'); }
  get name() { return this.addProduct_form_group.get('product.name'); }
  get description() { return this.addProduct_form_group.get('product.description'); }
  get unit_price() { return this.addProduct_form_group.get('product.unit_price'); }
  get unit_in_stock() { return this.addProduct_form_group.get('product.unit_in_stock'); }
  get category_id() { return this.addProduct_form_group.get('product.category_id'); }

  private getCategoryById(id: number): ProductCategory | undefined {
    return this.categories.find(category => category.id === id);
  }

  exportToPDF() {
    const doc = new jsPDF();
    const columns = ['Product ID', 'Product Name', 'Product Description', 'Product Price', 'Product Unit', 'Date Created'];
    const rows = this.products.map(product => [
      product.id,
      product.name,
      product.description,
      product.unit_price,
      product.unit_in_stock,
      product.date_created,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows
    });

    doc.save('products.pdf');
  }

  onSubmit() {
    if (this.addProduct_form_group.invalid) {
      this.addProduct_form_group.markAllAsTouched();
      return;
    }

    const productFormValues = this.addProduct_form_group.get('product').value;
    const category = this.getCategoryById(Number(productFormValues.category_id));

    let newProduct: Product = {
      id: null,
      sku: productFormValues.sku,
      name: productFormValues.name,
      description: productFormValues.description,
      unit_price: Number(productFormValues.unit_price),
      image_url: productFormValues.image_url,
      active: productFormValues.active,
      unit_in_stock: Number(productFormValues.unit_in_stock),
      date_created: productFormValues.date_created,
      date_last_updated: productFormValues.date_last_updated,
      category: category
    }

    console.log(newProduct);

    // Save the product using the service
    this.adminService.saveNewProduct(newProduct).subscribe({
      next: response => {
        console.log('Product saved successfully:', response);
        alert('Product added successfully!');
        this.getAllProducts(); // Refresh the product list
      },
      error: response => {
        alert(`Something went wrong: ${response.message}`);
      }
    }
    );
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/products']);
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../common-classes/product';
import { ProductCategory } from '../common-classes/product-category';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    }).compileComponents();
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve product categories', () => {
    const dummyCategories: ProductCategory[] = [
      { id: 1, category_name: 'Category 1' },
      { id: 2, category_name: 'Category 2' }
    ];

    service.getCategories().subscribe(categories => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(dummyCategories);
    });

    const req = httpMock.expectOne(service['category_url_endpoint']);
    expect(req.request.method).toBe('GET');
    req.flush({ _embedded: { productCategory: dummyCategories } });
  });

});

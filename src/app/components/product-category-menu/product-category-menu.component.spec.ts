import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ProductCategoryMenuComponent } from './product-category-menu.component';
import { ProductService } from '../../services/product.service';

describe('ProductCategoryMenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCategoryMenuComponent],
      imports: [HttpClientModule],
      providers: [ProductService]
    })
      .compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ProductCategoryMenuComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

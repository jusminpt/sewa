import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ProductListAdminComponent } from './product-list-admin.component';
import { AdminService } from '../../services/admin.service';

describe('ProductListAdminComponent', () => {
  let component: ProductListAdminComponent;
  let fixture: ComponentFixture<ProductListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListAdminComponent],
      imports: [HttpClientModule], // Import HttpClientModule in the testing module
      providers: [AdminService] // Provide AdminService which depends on HttpClient
    }).compileComponents(); // Compile component's template and css

    fixture = TestBed.createComponent(ProductListAdminComponent); // Create component fixture
    component = fixture.componentInstance; // Get instance of component
    fixture.detectChanges(); // Detect changes to trigger lifecycle hooks
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Assert that component instance exists
  });
});

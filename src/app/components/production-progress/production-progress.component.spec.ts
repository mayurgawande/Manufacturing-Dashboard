import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionProgressComponent } from './production-progress.component';

describe('ProductionProgressComponent', () => {
  let component: ProductionProgressComponent;
  let fixture: ComponentFixture<ProductionProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionProgressComponent]
    });
    fixture = TestBed.createComponent(ProductionProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

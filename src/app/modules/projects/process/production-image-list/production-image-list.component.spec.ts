import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionImageListComponent } from './production-image-list.component';

describe('ProductionImageListComponent', () => {
  let component: ProductionImageListComponent;
  let fixture: ComponentFixture<ProductionImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

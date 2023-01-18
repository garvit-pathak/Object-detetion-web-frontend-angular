import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductionProcessComponent } from './edit-production-process.component';

describe('EditProductionProcessComponent', () => {
  let component: EditProductionProcessComponent;
  let fixture: ComponentFixture<EditProductionProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductionProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductionProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

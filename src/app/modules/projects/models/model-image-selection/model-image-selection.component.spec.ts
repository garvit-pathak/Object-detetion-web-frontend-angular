import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelImageSelectionComponent } from './model-image-selection.component';

describe('ModelImageSelectionComponent', () => {
  let component: ModelImageSelectionComponent;
  let fixture: ComponentFixture<ModelImageSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelImageSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelImageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

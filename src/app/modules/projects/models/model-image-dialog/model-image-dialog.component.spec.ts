import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelImageDialogComponent } from './model-image-dialog.component';

describe('ModelImageDialogComponent', () => {
  let component: ModelImageDialogComponent;
  let fixture: ComponentFixture<ModelImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

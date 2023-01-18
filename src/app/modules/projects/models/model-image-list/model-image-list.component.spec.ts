import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelImageListComponent } from './model-image-list.component';

describe('ModelImageListComponent', () => {
  let component: ModelImageListComponent;
  let fixture: ComponentFixture<ModelImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

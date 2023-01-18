import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCategoryItemComponent } from './faq-category-item.component';

describe('FaqCategoryItemComponent', () => {
  let component: FaqCategoryItemComponent;
  let fixture: ComponentFixture<FaqCategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqCategoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

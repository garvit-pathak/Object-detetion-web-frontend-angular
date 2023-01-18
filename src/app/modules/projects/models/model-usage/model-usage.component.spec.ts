import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelUsageComponent } from './model-usage.component';

describe('ModelUsageComponent', () => {
  let component: ModelUsageComponent;
  let fixture: ComponentFixture<ModelUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

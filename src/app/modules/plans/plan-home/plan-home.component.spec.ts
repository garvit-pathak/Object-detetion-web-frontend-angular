import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanHomeComponent } from './plan-home.component';

describe('PlanHomeComponent', () => {
  let component: PlanHomeComponent;
  let fixture: ComponentFixture<PlanHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

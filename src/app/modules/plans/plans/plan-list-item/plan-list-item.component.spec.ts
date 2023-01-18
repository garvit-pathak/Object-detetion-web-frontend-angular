import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanListItemComponent } from './plan-list-item.component';

describe('PlanListItemComponent', () => {
  let component: PlanListItemComponent;
  let fixture: ComponentFixture<PlanListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

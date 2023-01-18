import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlanListComponent } from './my-plan-list.component';

describe('MyPlanListComponent', () => {
  let component: MyPlanListComponent;
  let fixture: ComponentFixture<MyPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPlanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

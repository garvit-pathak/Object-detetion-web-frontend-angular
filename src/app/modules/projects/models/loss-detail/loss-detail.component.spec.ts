import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossDetailComponent } from './loss-detail.component';

describe('LossDetailComponent', () => {
  let component: LossDetailComponent;
  let fixture: ComponentFixture<LossDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LossDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LossDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

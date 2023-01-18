import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionDetailComponent } from './detection-detail.component';

describe('DetectionDetailComponent', () => {
  let component: DetectionDetailComponent;
  let fixture: ComponentFixture<DetectionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

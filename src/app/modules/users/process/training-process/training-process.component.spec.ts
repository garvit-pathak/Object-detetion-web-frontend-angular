import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProcessComponent } from './training-process.component';

describe('TrainingProcessComponent', () => {
  let component: TrainingProcessComponent;
  let fixture: ComponentFixture<TrainingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

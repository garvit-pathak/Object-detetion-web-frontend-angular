import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartStopTrainComponent } from './start-stop-train.component';

describe('StartStopTrainComponent', () => {
  let component: StartStopTrainComponent;
  let fixture: ComponentFixture<StartStopTrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartStopTrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartStopTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

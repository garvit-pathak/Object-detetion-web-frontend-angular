import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTrainingOptDialogComponent } from './start-training-opt-dialog.component';

describe('StartTrainingOptDialogComponent', () => {
  let component: StartTrainingOptDialogComponent;
  let fixture: ComponentFixture<StartTrainingOptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartTrainingOptDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTrainingOptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

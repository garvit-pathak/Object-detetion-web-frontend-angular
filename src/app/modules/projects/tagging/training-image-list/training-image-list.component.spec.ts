import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingImageListComponent } from './training-image-list.component';

describe('TrainingImageListComponent', () => {
  let component: TrainingImageListComponent;
  let fixture: ComponentFixture<TrainingImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

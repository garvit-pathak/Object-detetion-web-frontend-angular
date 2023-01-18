import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskImageListComponent } from './task-image-list.component';

describe('TaskImageListComponent', () => {
  let component: TaskImageListComponent;
  let fixture: ComponentFixture<TaskImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

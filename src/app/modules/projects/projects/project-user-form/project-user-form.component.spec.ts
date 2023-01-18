import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUserFormComponent } from './project-user-form.component';

describe('ProjectUserFormComponent', () => {
  let component: ProjectUserFormComponent;
  let fixture: ComponentFixture<ProjectUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

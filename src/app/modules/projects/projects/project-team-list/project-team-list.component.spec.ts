import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTeamListComponent } from './project-team-list.component';

describe('ProjectTeamListComponent', () => {
  let component: ProjectTeamListComponent;
  let fixture: ComponentFixture<ProjectTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTeamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

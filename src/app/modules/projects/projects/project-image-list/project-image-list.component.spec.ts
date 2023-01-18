import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectImageListComponent } from './project-image-list.component';

describe('ProjectImageListComponent', () => {
  let component: ProjectImageListComponent;
  let fixture: ComponentFixture<ProjectImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggingImageListComponent } from './tagging-image-list.component';

describe('TaggingImageListComponent', () => {
  let component: TaggingImageListComponent;
  let fixture: ComponentFixture<TaggingImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggingImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggingImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

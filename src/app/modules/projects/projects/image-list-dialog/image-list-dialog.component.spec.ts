import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageListDialogComponent } from './image-list-dialog.component';

describe('ImageListDialogComponent', () => {
  let component: ImageListDialogComponent;
  let fixture: ComponentFixture<ImageListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

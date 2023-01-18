import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebuiltImgaeUploadComponent } from './prebuilt-imgae-upload.component';

describe('PrebuiltImgaeUploadComponent', () => {
  let component: PrebuiltImgaeUploadComponent;
  let fixture: ComponentFixture<PrebuiltImgaeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrebuiltImgaeUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebuiltImgaeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

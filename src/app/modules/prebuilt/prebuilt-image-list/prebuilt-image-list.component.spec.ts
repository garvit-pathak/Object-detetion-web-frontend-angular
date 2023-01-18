import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebuiltImageListComponent } from './prebuilt-image-list.component';

describe('PrebuiltImageListComponent', () => {
  let component: PrebuiltImageListComponent;
  let fixture: ComponentFixture<PrebuiltImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrebuiltImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebuiltImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

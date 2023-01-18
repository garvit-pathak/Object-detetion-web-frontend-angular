import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseModelImageListComponent } from './use-model-image-list.component';

describe('UseModelImageListComponent', () => {
  let component: UseModelImageListComponent;
  let fixture: ComponentFixture<UseModelImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseModelImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseModelImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

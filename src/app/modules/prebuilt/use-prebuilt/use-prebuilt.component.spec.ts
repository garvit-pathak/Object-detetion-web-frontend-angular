import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsePrebuiltComponent } from './use-prebuilt.component';

describe('UsePrebuiltComponent', () => {
  let component: UsePrebuiltComponent;
  let fixture: ComponentFixture<UsePrebuiltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsePrebuiltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsePrebuiltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

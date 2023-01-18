import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseModelComponent } from './use-model.component';

describe('UseModelComponent', () => {
  let component: UseModelComponent;
  let fixture: ComponentFixture<UseModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

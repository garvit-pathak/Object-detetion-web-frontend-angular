import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseByApiComponent } from './use-by-api.component';

describe('UseByApiComponent', () => {
  let component: UseByApiComponent;
  let fixture: ComponentFixture<UseByApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseByApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseByApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

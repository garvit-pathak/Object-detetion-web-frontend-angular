import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterKeysComponent } from './meter-keys.component';

describe('MeterKeysComponent', () => {
  let component: MeterKeysComponent;
  let fixture: ComponentFixture<MeterKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterKeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

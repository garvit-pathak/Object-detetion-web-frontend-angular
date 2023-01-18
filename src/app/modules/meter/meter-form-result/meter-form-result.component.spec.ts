import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterFormResultComponent } from './meter-form-result.component';

describe('MeterFormResultComponent', () => {
  let component: MeterFormResultComponent;
  let fixture: ComponentFixture<MeterFormResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterFormResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterFormResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

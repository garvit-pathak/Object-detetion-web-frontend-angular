import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterBaseComponent } from './meter-base.component';

describe('MeterBaseComponent', () => {
  let component: MeterBaseComponent;
  let fixture: ComponentFixture<MeterBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

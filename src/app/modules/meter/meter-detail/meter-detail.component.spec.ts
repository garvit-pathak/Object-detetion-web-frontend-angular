import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDetailComponent } from './meter-detail.component';

describe('MeterDetailComponent', () => {
  let component: MeterDetailComponent;
  let fixture: ComponentFixture<MeterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

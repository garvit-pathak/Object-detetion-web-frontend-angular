import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelPieChartComponent } from './label-pie-chart.component';

describe('LabelPieChartComponent', () => {
  let component: LabelPieChartComponent;
  let fixture: ComponentFixture<LabelPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-label-pie-chart',
  templateUrl: './label-pie-chart.component.html',
  styleUrls: ['./label-pie-chart.component.scss']
})
export class LabelPieChartComponent implements OnInit {

  @Input() data;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

  };
  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {

  }
  public doughnutChartLabels = ['Q1 Growth', 'Q2 Growth', 'Q3 Growth', 'Q4 Growth'];
  public doughnutChartData = [80, 83, 94, 87];
  public doughnutChartType = 'polarArea';
  ngOnInit(): void {
        this.pieChartLabels = this.data.label;
    this.pieChartData= this.data.data;

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

}

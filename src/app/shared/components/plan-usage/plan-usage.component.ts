import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { PlanService } from '../../services';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
  selector: 'app-plan-usage',
  templateUrl: './plan-usage.component.html',
  styleUrls: ['./plan-usage.component.scss']
})
export class PlanUsageComponent implements OnInit {
  @Input() group;
  selectedGroupId: any;
  planDetail: any;
  errorObject;
  model_trained_percentage;
  hits_used_percentage;
  storage_percentage;
  constructor(
    private planService: PlanService,
    private router: Router
  ) { }
  allDetail;
  public pieChartLabels = ['Used', 'Left'];
  public pieChartData ;
  public pieChartType = 'pie';

  barColors = [
    "#d26159",
    "rgb(95, 111, 197)"
  ];
  // #d94136
  public doughnutChartColors = [
    { backgroundColor: this.barColors },

  ];

  public doughnutChart2Labels = ['Hit ', 'left'];
  public doughnutChart2Data;
  public doughnutChart2Type = 'pie';

  public doughnutChartLabels = ['Trained', 'left'];
  public doughnutChartData;
  public doughnutChartType = 'pie';
  ngOnInit(): void {
    // this.getCurrentBasePlanDetail()


  }


  onGroupSelect(event): void {
    this.selectedGroupId = event;
    this.errorObject = null;
    this.getCurrentBasePlanDetail();
  }

  getCurrentBasePlanDetail(): void {

    this.planDetail = this.planService.getCurrenBasePlan(this.selectedGroupId).pipe(
      catchError(err => {

        this.errorObject = err.error.detail;
        return throwError(err);
      })
    );
    this.planService.getCurrenBasePlan(this.selectedGroupId).subscribe((data) => {
      this.allDetail = data
      this.model_trained_percentage = this.allDetail.model_trained * 100 / this.allDetail.overall_model_training_available

      this.hits_used_percentage = this.allDetail.hits_used * 100 / this.allDetail.overall_hits_available
      this.hits_used_percentage = this.hits_used_percentage.toFixed(2);
      
      
      this.storage_percentage = this.allDetail.storage_used *100/ this.allDetail.overall_storage
      this.storage_percentage = this.storage_percentage.toFixed(2);
       

      this.pieChartData = [this.allDetail.storage_used,this.allDetail.overall_storage -this.allDetail.storage_used]; 
      this.doughnutChart2Data = [this.allDetail.hits_used, this.allDetail.overall_hits_available-this.allDetail.hits_used];
      this.doughnutChartData = [this.allDetail.model_trained, this.allDetail.overall_model_training_available - this.allDetail.model_trained]

    })
  }
  onViewAll() {


    this.router.navigate(['/plans', { queryParams: { groupId: this.selectedGroupId } }])
  }
}

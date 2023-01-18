import { Component, Input, OnInit } from '@angular/core';
import { ProductionService } from '../../services';
import { PlotlyService } from '../../services/plotly.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
  selector: 'app-process-counts[isDashboard]',
  templateUrl: './process-counts.component.html',
  styleUrls: ['./process-counts.component.scss']
})
export class ProcessCountsComponent implements OnInit {

  private _isDashboard;
  private _projectId: number;
  // private _isSequential;


  data$;
  @Input() pending;
  @Input() running;
  @Input() ready;
  @Input() set isDashboard(value: boolean){
    this._isDashboard = value;
  }
  get isDashboard(): boolean{
    return this._isDashboard;
  }
  @Input() set projectId(value: number){
    this._projectId = value;
  }
  get projectId(): number{
    return this._projectId;
  }
  @Input() isSequential: boolean;

  // @Input() set isSequential(value: boolean){
  //   this._isSequential = value;
  // }
  // get isSequential(): boolean{
  //   return this._isSequential;
  // }
  constructor(
    private productionService: ProductionService,private plot: PlotlyService
  ) { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Training Process', 'Production Process'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData ;
  public doughnutChartLabels = ['Ready', 'left'];
  public doughnutChartData;
  public doughnutChartType = 'doughnut';
  ngOnInit(): void {
  
   
    

    if (!this._isDashboard && !this.projectId) {
      throw new TypeError('project id required if it is not using on dashboard');
    }
    // if(this._isDashboard){
    // this.plot.horizontalBar("myplot");

    // }
 
    if(this.isSequential){
      this.getSequentialProcessCount();
    }
    else{
      this.getProcessCount();
    
    }

  }


  getProcessCount(){
    if (this._isDashboard){

      this.data$ =  this.productionService.getProcessCount(true);
      this.productionService.getProcessCount(true).subscribe((data)=>{
        this.doughnutChartData = [data[0].ready_to_use_models, 10-data[0].ready_to_use_models];

        console.warn(data[0])
        this.barChartData = [
        
          {data: [data[0].pending_training_process, data[0].pending_production_process,10 ], label: 'Pending'},
          {data: [data[0].running_training_process,data[0].running_production_process, 0,10], label: 'Running'}

        ]      
      });
      return;
    }
    
    this.data$ =  this.productionService.getProcessCount(false,this.projectId);
    this.productionService.getProcessCount(false,this.projectId).subscribe((data)=>{
      this.doughnutChartData = [data[0].ready_to_use_models, 10-data[0].ready_to_use_models];
      console.warn(data[0].ready_to_use_models)
      this.barChartData = [
  
        {data: [data[0].pending_training_process, data[0].pending_production_process,10 ], label: 'Pending'},
        {data: [data[0].running_training_process,data[0].running_production_process, 0,10], label: 'Running'}
      ] 
    })
  }
 

  getSequentialProcessCount(){
      this.data$ =  this.productionService.getModelStatusPipeLine(this.projectId);
    }
}




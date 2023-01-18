import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../../../shared/services';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  productionProcess: any;
  trainingProcess: any;
  productionProcessCount: any;
  trainingProcessCount: any;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.showAllTrainingStatus();
    this.showAllProductionStatus();
  }
  onPageChange(event): void{
    const offset = event.pageSize * event.pageIndex;  // (event.pageSize - 1) * event.pageIndex
    this.showAllTrainingStatus(event.pageSize, offset);

  }

  onProductionPageChange(event): void{
    const offset = event.pageSize * event.pageIndex;  // (event.pageSize - 1) * event.pageIndex
    this.showAllProductionStatus(event.pageSize, offset);

  }

  showAllTrainingStatus(limit= 10, offset= 0): void {
    this.trainingService.showTrainingStatus(limit, offset).subscribe((data: any) => {
      this.trainingProcess = data.results;
      this.trainingProcessCount = data.count;

    });
  }
  showAllProductionStatus(limit= 10, offset= 0): void {
    this.trainingService.showProductionStatus(limit, offset).subscribe((data: any) => {
      this.productionProcess = data.results;
      this.productionProcessCount = data.count;

    });
  }
  }

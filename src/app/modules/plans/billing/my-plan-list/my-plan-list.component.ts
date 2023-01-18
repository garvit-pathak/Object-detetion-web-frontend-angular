import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SubscriptionPlanService } from '../../../../shared/services';

@Component({
  selector: 'app-my-plan-list',
  templateUrl: './my-plan-list.component.html',
  styleUrls: ['./my-plan-list.component.scss']
})
export class MyPlanListComponent implements OnInit {

  plans;
  totalItem: number;
  displayedColumns: string[] = ['name', 'effective_from', 'effective_upto', 'quantity', 'user', 'hits_used', 'model_trained', 'models_downloaded', 'purchased_on', 'price'];
  selectedGroup = null;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(
    private subsPlanService: SubscriptionPlanService,
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

  }

  onPageChange(event){

    const offset = event.pageSize * event.pageIndex;
    this.getList(event.pageSize, offset);
  }
  onSelectionChange(event){
    this.selectedGroup = event;


    this.getList(10, 0);
    this.paginator.firstPage();
    this.paginator.pageSize = 10;
  }
  getPlanName(name){


    switch (name){
      case 'BP':
        return 'Base plan';

      case 'AD':
        return 'Add On plan';

      case 'CP':
        return 'Custom plan';
    }
  }
  getList(limit, offset){
    this.subsPlanService.oldPlanList(this.selectedGroup, limit, offset).subscribe(data => {
      this.plans = data.results;
      this.totalItem = data.count;


    });
  }
}

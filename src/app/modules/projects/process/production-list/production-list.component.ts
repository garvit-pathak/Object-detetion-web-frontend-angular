import { EditProductionProcessComponent } from './../edit-production-process/edit-production-process.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductionService, SnackbarService } from '../../../../shared/services';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
@Component({
  selector: 'app-production-list',
  templateUrl: './production-list.component.html',
  styleUrls: ['./production-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductionListComponent implements OnInit {
  path = '../use'
  displayedColumns: string[] = ['name', 'started_by', 'start_time', 'end_time', 'action'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: any[] = [];
  expandedElement: any;

  resultsLength = 0;
  isLoadingResults = true;
  projectId: number
  modelId: number
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productionService: ProductionService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId
    this.modelId = this.route.snapshot.params.modelId
  }
  openEditDialog(element,event){

    const dialogPosition: DialogPosition = {
      top: event.y - 150 + 'px',
      left: event.x  - 250 + 'px'
    };
    let dialogref = this.dialog.open(EditProductionProcessComponent,{
      // width: '220px',
      height:'150px',
      position: dialogPosition,
      data:{
        process:element,
        projectId:this.projectId,
        modelId:this.modelId,
      }
    })
    dialogref.afterClosed().subscribe(result =>{
      if(result){
        this.ngAfterViewInit()
      }
    })
  }
  openDeleteDialog(processId): void{


    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {


      if (result){
        this.deleteProcess(processId);
      }
    });
  }
  private deleteProcess(processId){
    this.productionService.deleteProductionProcess(this.projectId, this.modelId,processId).subscribe(() => {
      this.snackbarService.open('process deleted successfully.','success')
      this.ngAfterViewInit()
      // this.getAll(10,0);
      // if (!this.pg.isFirstPage()){


      //   this.pg.changePage(0);
      // }
      // this.processDeleted.emit()

      // this.getAllProcessImageById(this.selectedProcess,12,0)
    },err => this.snackbarService.open(err.error.detail,'danger'));

  }
  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this.productionService);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;


          let a = this.sort.direction === 'asc' ? `${this.sort.active}` : `-${this.sort.active}`


          let offset = this.paginator.pageSize * this.paginator.pageIndex
          return this.exampleDatabase!.getRepoIssues(this.projectId, this.modelId, this.paginator.pageSize, offset, a
          );  //this.sort.active, this.sort.direction, this.paginator.pageIndex
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.count;

          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);

  }
}

export interface GithubIssue {
  // count:number;
  // next:string;
  // previous:string;
  // results:[
  //   id:number;
  //   name:string;
  //   start_time:string;
  //   end_time:string;
  // ]
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _productionService: ProductionService) { }

  getRepoIssues(projectId: number, modelId: number, limit: number, offset, sort: string): Observable<any> { //,sort: string, order: string, page: number


    return this._productionService.getAll(projectId, modelId, limit, offset, sort).pipe(
      map(k => {

        return k
      })
    )
  }

}

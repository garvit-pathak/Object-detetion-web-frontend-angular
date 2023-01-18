import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDeleteComponent } from '../../../shared/components/confirm-delete/confirm-delete.component';
import { SnackbarService, TaskService } from '../../../shared/services';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  taskList: any;
  totalItem: number;
  displayedColumns: string[] = ['assigned_by', 'assigned_to', 'group_name', 'percent_complete', 'model_name', 'message', 'action'];
  selectedGroupId: any;
  constructor(private taskService: TaskService,
              private snackbarService: SnackbarService,
              private dialog: MatDialog) { }

  ngOnInit(): void {

  }
  onPageChange(event) {

    const offset = event.pageSize * event.pageIndex;
    this.getAssignTaskDetail(event.pageSize, offset);
  }
  onGroupSelect(event) {


    this.selectedGroupId = event;
    this.getAssignTaskDetail(10, 0);

    this.paginator.firstPage();
    this.paginator.pageSize = 10;
  }
  getAssignTaskDetail(limit, offset) {



    this.taskService.getAssignedTaskList(this.selectedGroupId, limit, offset).subscribe((data: any) => {
      this.taskList = data.results;
      this.totalItem = data.count;


    });
  }
  openDeleteDialog(taskId) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {


      if (result) {
        this.deleteTask(taskId);
      }
    });
  }
  private deleteTask(taskId) {
    this.taskService.delete(taskId).subscribe(() => {
      this.getAssignTaskDetail(10, 0);
      this.snackbarService.open('task deleted successfully.', 'success');
    }, err => this.snackbarService.open(err.error.detail, 'danger'));

  }
}

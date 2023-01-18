import { ConfirmDeleteComponent } from './../confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Project } from '../../models';
import { ProjectService, SnackbarService } from '../../services';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit {

  @Input() project:Project;

  @Output() delete = new EventEmitter()
  constructor(
    private projectService: ProjectService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  openDeleteDialog(projctId){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {


      if(result){
        this.deleteProject(projctId)
      }
    });
  }
  hasPermission(): boolean {
    return this.project.hasProjectPermission()
  }
  private deleteProject(projectId){
    this.projectService.delete(projectId).subscribe((data:any)=>{
      this.snackbarService.open('project deleted successfully.','success')
      this.delete.emit(projectId)
    },err => this.snackbarService.open(err.error.detail,'danger'))

  }

}

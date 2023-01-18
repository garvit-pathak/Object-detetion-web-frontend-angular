import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: any;
  constructor(
    public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      data: {
        project: this.project
      },
      disableClose:true,
      autoFocus:true
    });
console.log('edit', this.project);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}

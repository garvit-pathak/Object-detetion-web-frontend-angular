import { Subscription } from 'rxjs';
import { ProjectFormComponent } from '../../../modules/projects/projects/project-form/project-form.component';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services';
import { Project } from '../../models';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit, OnDestroy {
  // displayedColumns: string[] = ['name','role'];
  projectList: Project[] = [];
  assignedProjectList: any[] = [];
  list: any[] = [];
  sub: Subscription;
  @Input() isSequential:boolean;
  constructor(private projectService: ProjectService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProjectList();
  }
  ngOnDestroy(): void{
    if (this.sub){
      this.sub.unsubscribe();
    }
  }
  newProject(): void{
    const dialogRef =  this.dialog.open(ProjectFormComponent, {
      data: {
        projectList: this.list,
        isSequential:this.isSequential
      },
    
      
      autoFocus: true,
      disableClose:true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getProjectList();
    });

  }
  getProjectList(): void {
    if ( !this.isSequential){
      this.sub =  this.projectService.getAll().subscribe((data: any) => {
        this.projectList = [];
        this.assignedProjectList = [];
        this.list = data.results;
        data.results.forEach(element => {
          if (element.role_name === 'primary owner') {
          this.projectList.push(new Project().deserialize(element));
          }
          else{
            this.assignedProjectList.push(new Project().deserialize(element));
          }
        });
      });
    }

    else{
      this.sub =  this.projectService.getIsSequential().subscribe((data: any) => {
        this.projectList = [];
        this.assignedProjectList = [];
        this.list = data.results;
        data.results.forEach(element => {
          if (element.role_name === 'primary owner') {
          this.projectList.push(new Project().deserialize(element));
          }
          else{
            this.assignedProjectList.push(new Project().deserialize(element));
          }
        });
      });
    }
  }

  onDelete(event){
    this.getProjectList()

  }
  projectAvailable(p:any[]){
    return p.length
  }
}

import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectService, SnackbarService, UserService } from '../../../../shared/services';
import { Project, User } from '../../../../shared/models';

@Component({
  selector: 'app-project-team-list',
  templateUrl: './project-team-list.component.html',
  styleUrls: ['./project-team-list.component.scss']
})
export class ProjectTeamListComponent implements OnInit {
  @Input() users;
  @Output() editUser = new EventEmitter();
  projectId:number
  project: Project;
  me:User;

  // users
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {


    this.projectId = this.route.snapshot.params.projectId
    this.getProject()
    // this.getList()
  }

  // getList(){
  //   this.users = this.userService.getProjectTeam(this.projectId)
  // }

  getMe(){
    this.userService.currentUser.subscribe((u:User)=>{
        this.me = u
    })
  }
  canEdit(){
    return this.project.hasProjectPermission()
  }
  onDelete(event){
    this.userService.removeFromProject(this.projectId,event.user_id).subscribe(data =>{

      this.snackbarService.open('User successfully removed from project.','success')

    },
    err =>{


      this.snackbarService.open(err.error.detail,'danger')
    })
  }
  onEdit(event){

    this.editUser.emit()
  }

  getProject(){
    this.projectService.currentProject
    .subscribe((p:Project)=>{
      this.project = p;
    })
  }
}

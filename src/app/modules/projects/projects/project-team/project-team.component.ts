import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, UserService } from '../../../../shared/services';
import { Project } from '../../../../shared/models';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {
  user: any;
  projectId: any;
  users: any;
  project: Project;
  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.projectId;
    this.getList();
    this.getProject()
  }
  editUser(event): void {
    this.user = event;

    this.getList()
  }
  addUser(): void {
    this.getList();
  }
  getList(){
    this.users = this.userService.getProjectTeam(this.projectId)


  }

  getProject(){
    this.projectService.currentProject.subscribe((p:Project) => {
      this.project = p

    })
  }
}

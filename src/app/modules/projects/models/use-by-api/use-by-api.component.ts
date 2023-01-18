import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../shared/models';
import { ProjectService } from '../../../../shared/services';

@Component({
  selector: 'app-use-by-api',
  templateUrl: './use-by-api.component.html',
  styleUrls: ['./use-by-api.component.scss']
})
export class UseByApiComponent implements OnInit {
  path = '../use'
  project$ : Observable<Project>
  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.project$ = this.projectService.currentProject
  }

}

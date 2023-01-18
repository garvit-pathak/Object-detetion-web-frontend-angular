import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Model, Project } from '../../models';
import { ModelService, ProjectService } from '../../services';

@Component({
  selector: 'app-base-project-model',
  template: `
    <p>
      base-project-model works!
    </p>
  `,
  styles: ['']
})
export class BaseProjectModelComponent implements OnInit, OnDestroy {
  project: Project;
  model: Model;
  projectModelSubscription: Subscription[] = [];
  constructor(
    public modelService: ModelService,
    public projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getProject();
    this.getModel();
  }
  ngOnDestroy(): void{
    this.projectModelSubscription.forEach(e => e.unsubscribe());
  }
  getProject(): void{
    this.projectModelSubscription.push(
     this.projectService.currentProject.subscribe((data: Project) => {
        this.project = data;
      })
    );
  }

  getModel(): void {
    this.projectModelSubscription.push(
      this.modelService.currentModel.subscribe((data: Model) => {
        this.model = data;
      })
    );
  }
}

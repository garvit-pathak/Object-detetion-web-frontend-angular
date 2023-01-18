import { takeUntil } from 'rxjs/operators';
import { SubscriptionCollection } from './../../../../shared/models/subscription-collection.model';
import { Observable, Subscription, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Model, Project } from '../../../../shared/models';
import { ModelService, ProjectService } from '../../../../shared/services';

@Component({
  selector: 'app-model-overview',
  templateUrl: './model-overview.component.html',
  styleUrls: ['./model-overview.component.scss']
})
export class ModelOverviewComponent implements OnInit {

  model: Model;
  project: Project;
  subs : SubscriptionCollection = new SubscriptionCollection()
  subscriptions: Subscription[] = [];
  constructor(
    private modelService: ModelService,
    private projectService: ProjectService
  ) {
    this.getModel();
    this.getProject()
   }

  ngOnInit(): void {
    this.getModel();
  }
  ngOnDestroy(){
    // prevent memory leak when component destroyed
    // this.subscriptions.forEach(s => s.unsubscribe());
    this.subs.unsubscriber()

  }
  getProject(){
  this.subs.subs['project'] =  this.projectService.currentProject
  .pipe(takeUntil(this.subs.destroy$))
  .subscribe((project: Project) => {
    this.project = project;

  })
  }
  getModel(){
    this.subs.subs['model'] =  this.modelService.currentModel
    .pipe(takeUntil(this.subs.destroy$))
    .subscribe((model: Model) => {
      this.model = model;


    })
  }
}

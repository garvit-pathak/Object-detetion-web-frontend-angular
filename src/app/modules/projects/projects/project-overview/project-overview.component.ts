import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModelService, ProductionService, ProjectService } from '../../../../shared/services';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();
  project = null;
  projectUpdate: any;
  modelList: any;
  constructor(
    private projectService: ProjectService,
    private modelService: ModelService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.projectService.currentProject
        .pipe(takeUntil(this.destroy)).subscribe(project => {

          this.project = project
          
        });
    }, 1000);

  }


  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  onModelUpdate(event){
   this.modelService.getAllByProjectId(event.project_id).subscribe((data: any) => {
    this.modelList = data.results;
    
  });

  }
}

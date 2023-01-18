import { UseByApiComponent } from './models/use-by-api/use-by-api.component';
import { ProductionListComponent } from './process/production-list/production-list.component';
import { TaggingBaseComponent } from './tagging/tagging-base/tagging-base.component';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ModelOverviewComponent } from './models/model-overview/model-overview.component';
import { ProjectTeamComponent } from './projects/project-team/project-team.component';
import { ProjectOverviewComponent } from './projects/project-overview/project-overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UseModelComponent } from './models/use-model/use-model.component';
import { ModelImageSelectionComponent } from './models/model-image-selection/model-image-selection.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectHomeComponent,
    children: [
      {path: '', component: ProjectOverviewComponent},

  ]},

  {path: 'team', component: ProjectTeamComponent},


  {
    path: 'models/:modelId',
    component: ModelOverviewComponent,
  },
  {
    path: 'models/:modelId/training',
    component: TaggingBaseComponent
  },
  {
    path: 'models/:modelId/process-history',
    component: ProductionListComponent
  },
  {
    path: 'models/:modelId/use',
    component: UseModelComponent
  },
  {
    path: 'models/:modelId/use-via-api',
    component: UseByApiComponent
  },
  {
    path: 'models/:modelId/image-selection',
    component: ModelImageSelectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }

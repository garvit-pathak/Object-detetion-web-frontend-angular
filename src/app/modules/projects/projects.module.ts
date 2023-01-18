import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../../app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectOverviewComponent } from './projects/project-overview/project-overview.component';
import { ProjectTeamComponent } from './projects/project-team/project-team.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectImageListComponent } from './projects/project-image-list/project-image-list.component';
import { ModelListComponent } from './models/model-list/model-list.component';
import { ImageListDialogComponent } from './projects/image-list-dialog/image-list-dialog.component';
import { ModelOverviewComponent } from './models/model-overview/model-overview.component';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ModelImageListComponent } from './models/model-image-list/model-image-list.component';
import { ModelImageDialogComponent } from './models/model-image-dialog/model-image-dialog.component';
import { ModelFormComponent } from './models/model-form/model-form.component';
import { TaggingBaseComponent } from './tagging/tagging-base/tagging-base.component';
import { TrainingImageListComponent } from './tagging/training-image-list/training-image-list.component';
import { ModelDetailComponent } from './models/model-detail/model-detail.component';
import { ModelUsageComponent } from './models/model-usage/model-usage.component';
import { ColorLabelListComponent } from './models/color-label-list/color-label-list.component';
import { LabelFormComponent } from './labels/label-form/label-form.component';
import { ChartsModule } from 'ng2-charts';
import { BaseLabelGraphComponent } from './labels/base-label-graph/base-label-graph.component';
import { LabelPieChartComponent } from './labels/label-pie-chart/label-pie-chart.component';
import { ProjectImageUploadComponent } from './projects/project-image-upload/project-image-upload.component';
import { StartStopTrainComponent } from './models/start-stop-train/start-stop-train.component';
import { ProductionListComponent } from './process/production-list/production-list.component';
import { ProjectTeamListComponent } from './projects/project-team-list/project-team-list.component';
import { UseModelComponent } from './models/use-model/use-model.component';
import { UseModelImageListComponent } from './models/use-model-image-list/use-model-image-list.component';
import { ModelImageSelectionComponent } from './models/model-image-selection/model-image-selection.component';
import { ProjectUserFormComponent } from './projects/project-user-form/project-user-form.component';
import { CreateProductionComponent } from './models/create-production/create-production.component';
import { LossDetailComponent } from './models/loss-detail/loss-detail.component';
import { NoLabelDialogComponent } from './labels/no-label-dialog/no-label-dialog.component';
import { ProductionImageListComponent } from './process/production-image-list/production-image-list.component';
import { UseByApiComponent } from './models/use-by-api/use-by-api.component';
import { DownloadModelComponent } from './models/download-model/download-model.component';
import { EditProductionProcessComponent } from './process/edit-production-process/edit-production-process.component';
import { StartTrainingOptDialogComponent } from './models/start-training-opt-dialog/start-training-opt-dialog.component';
@NgModule({
  declarations: [ ProjectOverviewComponent,
    ProjectTeamComponent, ProjectFormComponent,ProjectUserFormComponent,
    ProjectImageListComponent, ModelListComponent,
    ImageListDialogComponent, ModelOverviewComponent,
    ProjectHomeComponent, ProjectDetailComponent, ModelFormComponent,
    ModelImageListComponent, ModelImageDialogComponent,
    TaggingBaseComponent, TrainingImageListComponent,
    ModelDetailComponent, ModelUsageComponent, ColorLabelListComponent,
     LabelFormComponent,  BaseLabelGraphComponent,
     LabelPieChartComponent,
     ProjectImageUploadComponent,
     StartStopTrainComponent,
     ProductionListComponent,
     ProjectTeamListComponent,
     UseModelComponent,
     UseModelImageListComponent,
     ModelImageSelectionComponent,
     CreateProductionComponent,
     LossDetailComponent,
     NoLabelDialogComponent,
     ProductionImageListComponent,
     UseByApiComponent,
     DownloadModelComponent,
     EditProductionProcessComponent,
     StartTrainingOptDialogComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    FormsModule,
  ],
  exports: [
    ProjectFormComponent,
    ColorLabelListComponent,
    LabelFormComponent,
    BaseLabelGraphComponent
  ]
})
export class ProjectsModule { }

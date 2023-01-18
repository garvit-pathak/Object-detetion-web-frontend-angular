import { RouterModule } from '@angular/router';
import { PlanUsageComponent } from './components/plan-usage/plan-usage.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupSelectComponent } from './components/group-select/group-select.component';
import { AppMaterialModule } from './../app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import { FeatureModelCardComponent } from './components/feature-model-card/feature-model-card.component';
import { ImageListItemComponent } from './components/image-list-item/image-list-item.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ProcessCountsComponent } from './components/process-counts/process-counts.component';
import { TaggingImageListComponent } from './components/tagging-image-list/tagging-image-list.component';
import { BaseProjectModelComponent } from './components/base-project-model/base-project-model.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { ProjectListItemComponent } from './components/project-list-item/project-list-item.component';
import { PlanFilterPipe } from './pipes/plan-filter.pipe';
import { RolePopUpComponent } from './components/role-pop-up/role-pop-up.component';
import { ResponseFormatComponent } from './components/response-format/response-format.component';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { BackNavigationComponent } from './components/back-navigation/back-navigation.component';
import { SliderComponent } from './components/slider/slider.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationBannerComponent } from './components/notification-banner/notification-banner.component';


@NgModule({
  declarations: [
    GroupSelectComponent,
    FeatureCardComponent,
    FeatureModelCardComponent,
    ImageListItemComponent,
    ImageListComponent,
    ConfirmDeleteComponent,
    LoaderComponent,
    ProcessCountsComponent,
    TaggingImageListComponent,
    BaseProjectModelComponent,
    ProjectListComponent,
    PlanUsageComponent,
    DragDropDirective,
    ImageUploadComponent,
    ProgressBarComponent,
    UserListItemComponent,
    ProjectListItemComponent,
    PlanFilterPipe,
    RolePopUpComponent,
    ResponseFormatComponent,
    CustomSnackbarComponent,
    SafeUrlPipe,
    SafeHtmlPipe,
    BackNavigationComponent,
    SliderComponent,
    NotFoundComponent,
    NotificationBannerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    GroupSelectComponent,
    FeatureCardComponent,
    FeatureModelCardComponent,
    ImageListComponent,
    ConfirmDeleteComponent,
    ProcessCountsComponent,
    TaggingImageListComponent,
    BaseProjectModelComponent,
    ProjectListComponent,
    PlanUsageComponent,
    ImageUploadComponent,
    UserListItemComponent,
    PlanFilterPipe,
    RolePopUpComponent,
    ResponseFormatComponent,
    ProgressBarComponent,
    SafeUrlPipe,
    SafeHtmlPipe,
    BackNavigationComponent,
    SliderComponent,
    NotFoundComponent,
    NotificationBannerComponent

  ],
  entryComponents: [LoaderComponent]
})
export class SharedModule { }

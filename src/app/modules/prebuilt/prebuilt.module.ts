import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../../app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrebuiltRoutingModule } from './prebuilt-routing.module';
import { PrebuiltModelListComponent } from './prebuilt-model-list/prebuilt-model-list.component';
import { PrebuiltHomeComponent } from './prebuilt-home/prebuilt-home.component';
import { UsePrebuiltComponent } from './use-prebuilt/use-prebuilt.component';
import { PrebuiltImgaeUploadComponent } from './prebuilt-imgae-upload/prebuilt-imgae-upload.component';
import { PrebuiltCanvasComponent } from './prebuilt-canvas/prebuilt-canvas.component';
import { PrebuiltImageListComponent } from './prebuilt-image-list/prebuilt-image-list.component';
import { ProjectsModule } from '../projects/projects.module';


@NgModule({
  declarations: [PrebuiltModelListComponent, PrebuiltHomeComponent, UsePrebuiltComponent, PrebuiltImgaeUploadComponent, PrebuiltCanvasComponent, PrebuiltImageListComponent],
  imports: [
    CommonModule,
    PrebuiltRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProjectsModule,
  ]
})
export class PrebuiltModule { }

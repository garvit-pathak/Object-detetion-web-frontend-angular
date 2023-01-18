import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetectionRoutingModule } from './detection-routing.module';
import { DetectionDetailComponent } from './detection-detail/detection-detail.component';

import { AppMaterialModule } from './../../app-material/app-material.module';
import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetectionDetailComponent],
  imports: [
    CommonModule,
    DetectionRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule 
  ],
  exports:[
    ReactiveFormsModule 
  ]
})
export class DetectionModule { }

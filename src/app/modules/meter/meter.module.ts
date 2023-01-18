import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeterBaseComponent } from './meter-base/meter-base.component';
import { MeterDetailComponent } from './meter-detail/meter-detail.component';
import { MeterFormResultComponent } from './meter-form-result/meter-form-result.component';
import { MeterFormComponent } from './meter-form/meter-form.component';
import { MeterKeysComponent } from './meter-keys/meter-keys.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MeterRoutingModule } from './meter-routing.module';



@NgModule({
  declarations: [MeterBaseComponent, MeterDetailComponent, MeterFormResultComponent, MeterFormComponent, MeterKeysComponent],
  imports: [
    CommonModule,
    MeterRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    MeterBaseComponent
  ],
})
export class MeterModule { }

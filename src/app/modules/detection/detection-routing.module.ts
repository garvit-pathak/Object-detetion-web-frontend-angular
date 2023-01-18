import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetectionDetailComponent } from './detection-detail/detection-detail.component';
const routes: Routes = [
  {
    path: '',
    component: DetectionDetailComponent,
    children: [
      {path: '', component: DetectionDetailComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetectionRoutingModule { }

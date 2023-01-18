import { UsePrebuiltComponent } from './use-prebuilt/use-prebuilt.component';
import { PrebuiltModelListComponent } from './prebuilt-model-list/prebuilt-model-list.component';
import { PrebuiltHomeComponent } from './prebuilt-home/prebuilt-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PrebuiltHomeComponent,
    children: [
      {path: '', component: PrebuiltModelListComponent},

  ]},
  {
    path:':publicModelId',
    component:UsePrebuiltComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrebuiltRoutingModule { }

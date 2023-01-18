import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/gaurds';
import { MeterBaseComponent } from './meter-base/meter-base.component';

const routes: Routes = [
  {path: '', component: MeterBaseComponent, canActivate: [AuthGuard]},
  // {path:'assign-task',component: AssignTaskComponent},
  // {path:'show-task/:taskId',component: ShowTaskComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterRoutingModule { }

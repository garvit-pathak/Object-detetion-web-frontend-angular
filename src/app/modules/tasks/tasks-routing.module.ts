import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from '../../shared/gaurds';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { ShowTaskComponent } from './show-task/show-task.component';

const routes: Routes = [
  {path: '', component: TaskListComponent, canActivate: [AuthGuard]},
  {path:'assign-task',component: AssignTaskComponent},
  {path:'show-task/:taskId',component: ShowTaskComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowTaskComponent } from './show-task/show-task.component';
import { TaskImageListComponent } from './task-image-list/task-image-list.component';
import { ProjectsModule } from '../projects/projects.module';
import { TaskProgressComponent } from './task-progress/task-progress.component';


@NgModule({
  declarations: [AssignTaskComponent, TaskListComponent, ShowTaskComponent, TaskImageListComponent, TaskProgressComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    ProjectsModule
  ],
  exports: [
    TaskListComponent
  ],
})
export class TasksModule { }

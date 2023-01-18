import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { DashboardComponent } from './modules/users/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/gaurds';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {path:'dashboard',component:DashboardComponent, canActivate: [AuthGuard]},
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),

  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: 'meter-reading',
    loadChildren: () => import('./modules/meter/meter.module').then(m => m.MeterModule)
  },
  {
    path: 'detection-detail',
    loadChildren: () => import('./modules/detection/detection.module').then(m => m.DetectionModule)  //detection
  },
  {
    path: 'plans',
    loadChildren: () => import('./modules/plans/plans.module').then(m => m.PlansModule)
  },
  {
    path: 'projects/:projectId',
    loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'tickets',
    loadChildren: () => import('./modules/tickets/tickets.module').then(m => m.TicketsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ready-to-use',
    loadChildren: () => import('./modules/prebuilt/prebuilt.module').then(m => m.PrebuiltModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    loadChildren: () => import('./modules/faq/faq.module').then(m => m.FaqModule),
    // canActivate: [AuthGuard]
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/gaurds';
import { GroupListComponent } from './group/group-list/group-list.component';
import { ProcessComponent } from './process/process/process.component';
import { ProfileComponent } from './profile/profile/profile.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'members', component: GroupListComponent, canActivate: [AuthGuard]},
  {path: 'process', component: ProcessComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

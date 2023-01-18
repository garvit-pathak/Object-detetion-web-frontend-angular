import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeBaseComponent } from './home-base/home-base.component';
import { AuthGuard } from '../../shared/gaurds';

const routes: Routes = [
  {
    path: '',

    component: HomeBaseComponent,
    children: [
      {path:'',component: HomeComponent,pathMatch: 'full',canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

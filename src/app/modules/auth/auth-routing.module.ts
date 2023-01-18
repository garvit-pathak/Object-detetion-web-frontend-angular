import { OnlyAnonymousGuard } from './../../shared/gaurds/only-anonymous.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { AuthGuard } from '../../shared/gaurds';
import { AuthBaseComponent } from './auth-base/auth-base.component';

const routes: Routes = [
  {
    path: '',
    component: AuthBaseComponent,
    children: [
      {path:'login', component: LoginComponent,canActivate: [OnlyAnonymousGuard]}

  ],
  // canActivate: [AuthGuard]
  },
  {
    path: 'forgotPassword',
    component: RequestResetPasswordComponent,
    canActivate: [OnlyAnonymousGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [OnlyAnonymousGuard]
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    canActivate: [OnlyAnonymousGuard]
  },
  {
    path: 'set-password/:token',
    component: SetPasswordComponent,
    canActivate: [OnlyAnonymousGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

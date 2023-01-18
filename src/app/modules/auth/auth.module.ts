import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../../app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { AuthBaseComponent } from './auth-base/auth-base.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, RequestResetPasswordComponent, ResetPasswordComponent, SetPasswordComponent, AuthBaseComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }

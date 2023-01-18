import { SharedModule } from './../../shared/shared.module';
import { AppMaterialModule } from './../../app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupUserListComponent } from './group/group-user-list/group-user-list.component';
import { UserFormComponent } from './group/user-form/user-form.component';
import { ProcessComponent } from './process/process/process.component';
import { TrainingProcessComponent } from './process/training-process/training-process.component';
import { ProductionProcessComponent } from './process/production-process/production-process.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressDropdownComponent } from './address/address-dropdown/address-dropdown.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { AddressDetailComponent } from './profile/address-detail/address-detail.component';
import { AddressFormComponent } from './profile/address-form/address-form.component';
import { ChangePasswordFormComponent } from './profile/change-password-form/change-password-form.component';


@NgModule({
  declarations: [
    DashboardComponent,  GroupListComponent,
    GroupUserListComponent, UserFormComponent,
    ProcessComponent, TrainingProcessComponent,
    ProductionProcessComponent, AddressFormComponent,
    ChangePasswordFormComponent, AddressDropdownComponent,
    GroupListComponent, GroupUserListComponent,
    UserFormComponent,ProcessComponent, TrainingProcessComponent,
    ProductionProcessComponent, AddressFormComponent, ChangePasswordFormComponent,
    ProfileComponent, AddressDetailComponent

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,

  ],
  exports: [
    DashboardComponent,
    AddressDropdownComponent,
    AddressFormComponent
  ],
  providers: [DatePipe],
})
export class UsersModule { }

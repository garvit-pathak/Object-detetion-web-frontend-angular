import { UsersModule } from './../users/users.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../../app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PlanHomeComponent } from './plan-home/plan-home.component';
import { PlanListComponent } from './plans/plan-list/plan-list.component';
import { PlanListItemComponent } from './plans/plan-list-item/plan-list-item.component';
import { GoToCartComponent } from './plans/go-to-cart/go-to-cart.component';
import { CartComponent } from './plans/cart/cart.component';
import { MyPlanListComponent } from './billing/my-plan-list/my-plan-list.component';
import { CartItemComponent } from './plans/cart-item/cart-item.component';
import { PaymentSuccessComponent } from './plans/payment-success/payment-success.component';


@NgModule({
  declarations: [ PlanHomeComponent, PlanListComponent, PlanListItemComponent,
    GoToCartComponent, CartComponent, MyPlanListComponent, CartItemComponent,
    PaymentSuccessComponent],
  imports: [
    CommonModule,
    PlansRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    UsersModule

  ],
  exports: [
    PlanListItemComponent
      ]
})
export class PlansModule { }

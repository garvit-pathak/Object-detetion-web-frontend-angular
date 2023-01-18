import { MyPlanListComponent } from './billing/my-plan-list/my-plan-list.component';
import { PlanListComponent } from './plans/plan-list/plan-list.component';
import { CartComponent } from './plans/cart/cart.component';
import { PlanHomeComponent } from './plan-home/plan-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:PlanHomeComponent,
    children:[
      {path:'',component:MyPlanListComponent}
    ]
  },
  {path:'pricing',component: PlanListComponent},
  {path:'cart',component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }

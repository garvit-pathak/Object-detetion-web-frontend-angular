import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket/raise-ticket.component';
import { AuthGuard } from '../../shared/gaurds';

const routes: Routes = [
  {path: '', component: RaiseTicketComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }

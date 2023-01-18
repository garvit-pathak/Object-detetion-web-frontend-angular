import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing.module';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket/raise-ticket.component';
import { RaiseTicketFormComponent } from './raise-ticket/raise-ticket-form/raise-ticket-form.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketHomeComponent } from './ticket-home/ticket-home.component';


@NgModule({
  declarations: [RaiseTicketComponent, RaiseTicketFormComponent, TicketHomeComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    RaiseTicketComponent
  ],
})
export class TicketsModule { }

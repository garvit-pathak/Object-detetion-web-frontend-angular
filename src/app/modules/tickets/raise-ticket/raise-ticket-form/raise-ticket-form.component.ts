import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BasicForm } from '../../../../shared/models';
import { SnackbarService, TicketService } from '../../../../shared/services';

@Component({
  selector: 'app-raise-ticket-form',
  templateUrl: './raise-ticket-form.component.html',
  styleUrls: ['./raise-ticket-form.component.scss']
})
export class RaiseTicketFormComponent extends BasicForm implements OnInit {
  errorFromServer: any;
  constructor(private formBuilder: FormBuilder,
              private snackbarService: SnackbarService,
              private ticketService: TicketService,
              public dialogRef: MatDialogRef<RaiseTicketFormComponent>, ) { super(); }
  TicketTypeOptions: any[] = [
    {value: 'PRODUCT', viewValue: 'PRODUCT'},
    {value: 'PAYMENT', viewValue: 'PAYMENT'},
    {value: 'OTHER', viewValue: 'OTHER'}
  ];
  priorityOptions: any[] = [
    {value: 'L', viewValue: 'LOW'},
    {value: 'M', viewValue: 'MEDIUM'},
    {value: 'H', viewValue: 'HIGH'}
  ];
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ticket_type: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', [Validators.required]],
      phone_number: ['', [Validators.required]]
    });
  }
  onSubmit(): void {
    if (this.form.invalid) {return; }

    this.ticketService.create(this.form.value).subscribe((data: any) => {

      this.form.reset();
      this.closeDialog();
      this.snackbarService.open('Ticket raised successfully','success');
    },
    error => {
      this.errorFromServer = error.error.phone_number;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

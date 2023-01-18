import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from '../../../../shared/services';
import { RaiseTicketFormComponent } from '../raise-ticket-form/raise-ticket-form.component';

@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.scss']
})
export class RaiseTicketComponent implements OnInit {
  ticketDetail: any;
  ticketCount: any;

  constructor(private ticketService: TicketService,
              public dialog: MatDialog) { }
  displayedColumns: string[] = ['ticket_type', 'description','status', 'phone_number', 'created_at'];
  ngOnInit(): void {
    this.getTicketDetail();
  }
  getTicketDetail(limit= 10, offset= 0) {
    this.ticketService.getAllTicketDetail(limit, offset).subscribe((data: any) => {
      this.ticketDetail = data.results;
      this.ticketCount = data.count;

      // this.form.reset();
    });
  }
  onPageChange(event): void{
    const offset = event.pageSize * event.pageIndex;  // (event.pageSize - 1) * event.pageIndex
    this.getTicketDetail(event.pageSize, offset);

  }
  raiseTicket(){
    let dialogRef =  this.dialog.open(RaiseTicketFormComponent, {
      data: {
      },
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTicketDetail();
    });

  }
}

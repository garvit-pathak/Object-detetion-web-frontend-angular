import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(public datepipe: DatePipe) { }
 today 
  ngOnInit(): void {
    this.today =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    console.warn(this.today)
  }



}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-training-process',
  templateUrl: './training-process.component.html',
  styleUrls: ['./training-process.component.scss']
})
export class TrainingProcessComponent implements OnInit {
  @Output() pageChange = new EventEmitter<any>();
  @Input() trainingProcess;
  @Input() trainingProcessCount;
  constructor() { }
  displayedColumns: string[] = ['model_name', 'status', 'start_date', 'end_date', 'checkpoint', 'loss'];
  ngOnInit(): void {
  }
  onPageChange(event): void {
    this.pageChange.emit(event);
  }
}

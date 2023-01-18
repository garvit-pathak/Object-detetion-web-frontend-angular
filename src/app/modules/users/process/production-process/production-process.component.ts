import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-production-process',
  templateUrl: './production-process.component.html',
  styleUrls: ['./production-process.component.scss']
})
export class ProductionProcessComponent implements OnInit {
  @Output() productionPageChange = new EventEmitter<any>();
  @Input() productionProcess;
  @Input() productionProcessCount;
  constructor() { }
  displayedColumns: string[] = ['model', 'user', 'process', 'start_date', 'end_date'];

  ngOnInit(): void {
  }
  onPageChange(event): void {
    this.productionPageChange.emit(event);
  }
}

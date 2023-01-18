import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-meter-form-result',
  templateUrl: './meter-form-result.component.html',
  styleUrls: ['./meter-form-result.component.scss']
})
export class MeterFormResultComponent implements OnChanges  {
  @Input() images
  constructor() { }

  ngOnChanges(): void {
  }

}

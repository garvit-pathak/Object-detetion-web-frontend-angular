import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-usage',
  templateUrl: './model-usage.component.html',
  styleUrls: ['./model-usage.component.scss']
})
export class ModelUsageComponent implements OnInit {
  @Input() model: any;
  @Input() project: any;
  constructor() { }

  ngOnInit(): void {
  }

}

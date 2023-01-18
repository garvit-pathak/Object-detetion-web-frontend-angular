import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-model-card',
  templateUrl: './feature-model-card.component.html',
  styleUrls: ['./feature-model-card.component.scss']
})
export class FeatureModelCardComponent implements OnInit {
  @Input() ready;
  constructor() { }

  ngOnInit(): void {
  }

}

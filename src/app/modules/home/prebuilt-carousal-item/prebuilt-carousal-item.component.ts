import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prebuilt-carousal-item',
  templateUrl: './prebuilt-carousal-item.component.html',
  styleUrls: ['./prebuilt-carousal-item.component.scss']
})
export class PrebuiltCarousalItemComponent implements OnInit {

  @Input() item;
  constructor() { }

  ngOnInit(): void {
  }

}

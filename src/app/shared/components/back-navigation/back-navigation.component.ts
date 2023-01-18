import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-back-navigation',
  templateUrl: './back-navigation.component.html',
  styleUrls: ['./back-navigation.component.scss']
})
export class BackNavigationComponent implements OnInit {
  @Input() path;
  constructor(private _location : Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();  
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template:
    `<mat-spinner></mat-spinner>`,
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

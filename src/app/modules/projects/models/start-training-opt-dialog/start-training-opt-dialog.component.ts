import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-training-opt-dialog',
  templateUrl: './start-training-opt-dialog.component.html',
  styleUrls: ['./start-training-opt-dialog.component.scss']
})
export class StartTrainingOptDialogComponent implements OnInit {

  list = [
    {'name': 'Continue where I left.',  'checked': true, value: false},
    {'name': 'Start from scratch.',  'checked': false, value: true}
  ];

  scratch;

  constructor() { }

  ngOnInit(): void {
    this.scratch = this.list[0].value
  }

}

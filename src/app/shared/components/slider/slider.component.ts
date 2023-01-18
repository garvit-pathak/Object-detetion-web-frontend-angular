import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  confidenceLevel:number
  constructor(public dialogRef: MatDialogRef<SliderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.confidenceLevel = this.data.confidenceLevel;
               }

  ngOnInit(): void {

  }
  updateSetting(event) {
    this.confidenceLevel = event.value;


    // this.dialogRef.close(this.confidenceLevel);
  }

}

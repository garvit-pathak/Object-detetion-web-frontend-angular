import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    private _snackRef: MatSnackBarRef<CustomSnackbarComponent>,
  ) { }

  ngOnInit(): void {


  }
  close(){
    this._snackRef.dismiss()
  }
}

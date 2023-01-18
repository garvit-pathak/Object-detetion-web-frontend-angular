import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.scss']
})
export class NotificationBannerComponent implements OnInit {

data={
  title:'Hi there',
  body:'Your production process has been completed',
}
  constructor(
    // @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _snackRef: MatSnackBarRef<NotificationBannerComponent>,
  ) { }

  ngOnInit(): void {
  }

  close(){
    this._snackRef.dismiss()
  }
}

import { NotificationBannerComponent } from './../components/notification-banner/notification-banner.component';
import { CustomSnackbarComponent } from './../components/custom-snackbar/custom-snackbar.component';
import { Injectable } from '@angular/core';


import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


const DEFAULT_CONFIG: MatSnackBarConfig = {
  horizontalPosition: 'end',
  verticalPosition: 'top',
  duration: 4000
};




@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  open(message,type: 'success' | 'danger' | 'info', action: string = '', config: MatSnackBarConfig = {}) {
    config.panelClass = ['alert', `alert-${type}`]
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };
    this.snackBar.open(message, action, dialogConfig);

  }
  openCustom(message, type: 'success' | 'danger' | 'info', config: MatSnackBarConfig = {},infiniteTime=false) {
    config.panelClass = ['alert', `alert-${type}`]
    // const dialogConfig = { data:message,...DEFAULT_CONFIG, ...config };
    // this.snackBar.openFromComponent(CustomSnackbarComponent, dialogConfig);

    let timeOut =2000

    if (message instanceof Array) {
      message.forEach((message, index) => {
        let dialogConfig = { data: message, ...DEFAULT_CONFIG, ...config, duration: timeOut };


        setTimeout(() => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, dialogConfig);
        }, index * (timeOut + 500)); // 500 - timeout between two messages

      });
    }
    else {
      let dialogConfig = { data: message, ...DEFAULT_CONFIG, ...config};

      if(infiniteTime){
        dialogConfig.duration = undefined
      }

      this.snackBar.openFromComponent(CustomSnackbarComponent, dialogConfig);

    }
  }
  openNotificationBanner(data, type: 'success' | 'danger' | 'info'  | 'notification', config: MatSnackBarConfig = {},infiniteTime=false) {
    config.panelClass = ['alert', `alert-${type}`]
    // const dialogConfig = { data:message,...DEFAULT_CONFIG, ...config };
    // this.snackBar.openFromComponent(CustomSnackbarComponent, dialogConfig);

    let timeOut =2000

    if (data instanceof Array) {
      data.forEach((message, index) => {
        let dialogConfig = { data: message, ...DEFAULT_CONFIG, ...config, duration: timeOut };


        setTimeout(() => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, dialogConfig);
        }, index * (timeOut + 500)); // 500 - timeout between two messages

      });
    }
    else {
      let dialogConfig = { data: data, ...DEFAULT_CONFIG, ...config};

      if(infiniteTime){
        dialogConfig.duration = undefined
      }

      this.snackBar.openFromComponent(NotificationBannerComponent, dialogConfig);

    }
  }

}

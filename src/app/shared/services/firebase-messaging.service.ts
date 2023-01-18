import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, merge } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging,
              private http: HttpClient,
              private snackbarService: SnackbarService) {
    // merge(this.angularFireMessaging.messages, this.angularFireMessaging.onTokenRefresh).subscribe(data => console.log(data));
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
            const data = {
              registration_id: token,
              type: 'web'
            };
        this.http.post(`${environment.server}/devices/`, data).toPromise();
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        this.snackbarService.openNotificationBanner(payload.notification, 'notification');

        this.currentMessage.next(payload);
      });
  }
}


import { NavigationStart, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, FirebaseMessagingService } from './shared/services';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy{
  title = 'Xtract';
  loggedIn: boolean;
  subscription: Subscription[] = [];
  message;
  constructor(
    private authService: AuthService,
    private router: Router,
    private messagingService: FirebaseMessagingService

 )
  {
    this.subscription.push(
      this.authService.isUserLoggedIn.subscribe(res => this.isLoggedIn(res) )
    );
    this.subscription.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          browserRefresh = !router.navigated;
        }
    })
    );

  }
  ngOnInit(): void {
    // this.messagingService.requestPermission();

    this.messagingService.receiveMessage();
    this.messagingService.currentMessage.subscribe(message => {
     this.message = message;
   });
  }
  ngOnDestroy(): void{
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
  isLoggedIn(res): void {

    if (res) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

  }
}

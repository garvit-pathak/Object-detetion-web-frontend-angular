import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services';

@Component({
  selector: 'app-live-active-users',
  templateUrl: './live-active-users.component.html',
  styleUrls: ['./live-active-users.component.scss']
})
export class LiveActiveUsersComponent implements OnInit {
  currentCount$
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
   this.currentCount$ = this.userService.getUserCount();
  }


}

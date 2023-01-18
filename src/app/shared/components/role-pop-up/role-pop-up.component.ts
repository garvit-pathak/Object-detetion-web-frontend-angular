import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services';

@Component({
  selector: 'app-role-pop-up',
  templateUrl: './role-pop-up.component.html',
  styleUrls: ['./role-pop-up.component.scss']
})
export class RolePopUpComponent implements OnInit {
  roles
  defaultRole: any;

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles(): void {
    this.userService.getAllRoles().subscribe((data: any) => {
      this.roles = data;
      this.defaultRole = this.data.role.id

    });
  }
}

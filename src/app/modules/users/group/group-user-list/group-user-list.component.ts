import { RolePopUpComponent } from './../../../../shared/components/role-pop-up/role-pop-up.component';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { SnackbarService, UserService } from '../../../../shared/services';
import { Role } from '../../../../shared/models';

@Component({
  selector: 'app-group-user-list',
  templateUrl: './group-user-list.component.html',
  styleUrls: ['./group-user-list.component.scss']
})
export class GroupUserListComponent implements OnInit {
  @HostListener('window:scroll')
  @Output() editUser = new EventEmitter();
  @Input() groupId;
  userList: any;

  @Input() canChange=false
  constructor(private userService: UserService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService
    ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.userService.getAllUsersOfGroup(this.groupId).subscribe((data: any) => {
      this.userList = data;
    });
  }

  deleteUserFromGroup(id): void {
    this.userService.deleteUserFromGroup(id).subscribe((data) => {
      this.getUserList();

    });
  }

  edit(user,event): void {


        const dialogPosition: DialogPosition = {
      top: event.y - 250 + 'px',
      left: event.x  - 250 + 'px'
    };
    const dialogRef = this.dialog.open(RolePopUpComponent, {
      width: '220px',
      height:'255px',
      position: dialogPosition,
      data:{
        role:{
          id:user.role_id,
          name:user.role_name
        }
      }
    })

    dialogRef.afterClosed().subscribe((result:any)=>{

      if(result){
        this.updateRole(user,result)
      }
    })
  }

  private updateRole(user,roleId:number){

    const u1 = {
      id: user.id,
      user_id: user.user_id,
      role_id: roleId,
    };
    this.userService.updateUserRole(u1).subscribe(data => {

      this.snackbarService.open('Role updated successfully','success');
      this.getUserList()
    }, error => {
      this.snackbarService.open(error.error.detail,'danger');
    });
  }
  canEdit(user){
    return user.role_name !== Role.PRIMARY_OWNER && this.canChange
  }
}

import { RolePopUpComponent } from './../role-pop-up/role-pop-up.component';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Project, Role } from '../../models';
import { SnackbarService, UserService } from '../../services';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input() user:any;
  @Input() canEdit:boolean = false;
  @Input() project:Project

  @Output() edited = new EventEmitter()
  @Output() delete = new EventEmitter()

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
  }

  getName(user){
    return user.email ? user.email : user.user_email
  }


  editUserRole(user,event){

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
  private updateRole(user,roleId){
    const u1 = {
      id: user.id,
      user_id: user.user_id,
      role_id: roleId,
    };

    this.userService.updateUserInProject(this.project.project_id, u1).subscribe((data: any) => {

      this.snackbarService.open('Role updated successfully','success');
      this.edited.emit()
    });
  }
  canChange(){
    return this.user.role_name !== Role.PRIMARY_OWNER && this.canEdit
  }
}

import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Role } from '../../../../shared/models';
import { GroupService } from '../../../../shared/services';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groupList: any[];
  assignedGroupList: any[];
  list: any[];
  user: any;
  changeEvent: any;
  constructor(private groupService: GroupService, ) { }

  ngOnInit(): void {
    this.getGroupList();
  }

  addUser(): void {
    this.getGroupList();
  }
  editUser(event): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.user = event;

  }

  canChange(group){
    return group.role === Role.PRIMARY_OWNER || group.role === Role.ADMIN
  }
  getGroupList(): void {
    this.groupService.getAllGroupWithUsers().subscribe((data: any) => {
      this.groupList = [];
      this.assignedGroupList = [];
      this.list = data;


      data.forEach(element => {
        if (element.role === 'primary owner') {
          this.groupList.push(element);

        }
        else{
          this.assignedGroupList.push(element);

        }
      });
    });
  }
}

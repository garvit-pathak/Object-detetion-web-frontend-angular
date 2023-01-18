import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GroupService } from '../../services';
import { Role } from '../../models';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class GroupSelectComponent implements OnInit {
  @Input() showLabel: boolean = false
  @Input() styleClass
  @Input() isBasic = false
  @Input() isRequired = false;
  @Input() appearance = 'fill';
  @Input() isFiltered = true;
  groups$;
  defaultGroup;
  queryparamGroupId: number;
  @Output() selectedGroup = new EventEmitter();

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      switchMap((params: ParamMap) => {
        this.queryparamGroupId = Number(params['groupId']);
        return this.getList()
      })
    ).subscribe(d => {
      this.groups$ = d;
      this.setDefaultGroup()
    });
  }
  onSelectionChange(event): void {
    if (this.isBasic) {
      this.selectedGroup.emit(event.target.value);

    }
    else {
      this.selectedGroup.emit(event.value);

    }
  }
  getList(): Observable<any> {
    return this.groupService.getAllGroupList()
  }

  private setDefaultGroup(): void {
    this.groups$.forEach(element => {
      if (this.queryparamGroupId && element.group_id === this.queryparamGroupId) {

        this.defaultGroup = element.group_id;
        this.selectedGroup.emit(this.defaultGroup);
      }
      else if (element.role === 'primary owner') {
        this.defaultGroup = element.group_id;
        this.selectedGroup.emit(this.defaultGroup);
      }


    });
    if (this.isFiltered) {
      this.filterList();
    }
  }

  filterList(): void {
    this.groups$ = this.groups$.filter(m => this.filterElement(m.role));

  }

  private filterElement(role): any {
    return role === Role.ADMIN || role === Role.PRIMARY_OWNER || role === Role.MANAGER
  }
}

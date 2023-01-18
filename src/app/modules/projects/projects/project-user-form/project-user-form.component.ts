import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import { BasicForm, Project } from '../../../../shared/models';
import { ProjectService, SnackbarService, UserService } from '../../../../shared/services';
import { browserRefresh } from 'src/app/app.component';

@Component({
  selector: 'app-project-user-form',
  templateUrl: './project-user-form.component.html',
  styleUrls: ['./project-user-form.component.scss']
})
export class ProjectUserFormComponent extends BasicForm implements OnInit, OnChanges, OnDestroy {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  subs: Subscription[] = [];
  project: Project;
  @Output()
  addUser = new EventEmitter();
  @Input() user;
  form: FormGroup;
  selectedGroupId: any;
  userList: any;
  roles: any;
  filteredUsers: any;
  editMode: any = false;
  title: string;
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService,
              private projectService: ProjectService,) {
                super();
               }

  ngOnInit(): void {
    if (browserRefresh) {

      setTimeout(() => {
        this.getProject();
        this.getRoles();
        this.getUsers();
      }, 1000);
    }
    else {

      this.getProject();
      this.getRoles();
      this.getUsers();
    }
    this.title = 'Add New Member';
    this.form = this.formBuilder.group({
      email: [{value: '', disabled: true}, [Validators.required]],
      role: ['', Validators.required]
    });
    this.form.controls.email.enable();
    // this.filteredUsers = this.form.get('email').valueChanges.pipe(debounceTime(300),
    //                                 switchMap(value =>  this.userService.getAllUsersOfGroup(this.project.group_id))
    //  );
  }
  getProject(){
    this.subs.push(this.projectService.currentProject.subscribe((data: Project) => {
      this.project = data;
    }));

  }
  ngOnDestroy(){
    this.subs.forEach(e => e.unsubscribe());
  }
  ngOnChanges(changes: SimpleChanges): void{


    if (changes.user.currentValue) {
      this.title = 'Update Member';
      this.editMode = true;
      this.user = changes.user.currentValue;
      this.form.patchValue({
        email: this.user,
        role: this.user.role_id,
      });
    }


  }
  onCancel(): void {
    this.form.controls.email.enable();
    this.title = 'Add New Member';
    this.editMode = false;
    this.form.reset();
    this.formDirective.resetForm();
  }
  getName(user){
    return user && user.email ? user.email : user.user_email;
  }
  getRoles(): void {

    this.userService.getAllRoles().subscribe((data: any) => {
      this.roles = data;

    });
  }
  getUsers() {


    this.userService.getAllUsersOfGroup(this.project.group_id).subscribe((userlist: any) => {
      this.userList = userlist;

    })
  }

  addUserToGroup(): void {
    if (this.editMode == true) {
      const u = this.form.value;

      const u1 = {
        id: this.user.id,
        user_id: u.email.user_id,
        role_id: u.role,
      };

      this.userService.updateUserInProject(this.project.project_id, u1).subscribe((data: any) => {

        this.addUser.emit();
        this.snackbarService.open('Member updated successfully','success');
        this.title = 'Add New Member';
        this.editMode = false;
        this.form.reset();
        this.formDirective.resetForm();
      });
    }
    else {
      const u = this.form.value;


      const u1 = {
        user_id: Number(u.email.user_id),
        role_id: Number(u.role),
      };

      this.userService.crerateUsersInProject(this.project.project_id, u1).subscribe(data => {

        this.addUser.emit();
        this.snackbarService.open('Member added successfully','success');
        this.form.reset();
        this.formDirective.resetForm();
      }, error => {
        const errorFromServer = error.error.detail;

        this.snackbarService.open(errorFromServer,'danger');
        this.form.reset();
        this.formDirective.resetForm();
      });
    }
  }

}

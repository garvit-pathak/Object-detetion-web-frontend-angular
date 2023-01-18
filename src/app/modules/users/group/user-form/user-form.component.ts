import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {  of } from 'rxjs';
import { debounceTime, switchMap, tap, finalize } from 'rxjs/operators';
import { BasicForm } from '../../../../shared/models';
import {  SnackbarService, UserService } from '../../../../shared/services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends BasicForm implements OnInit, OnChanges {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  @Output()
  addUser = new EventEmitter();
  @Input() user;
  form: FormGroup;
  selectedGroupId: any;
  userList: any;
  roles: any;
  filteredUsers: any = [];
  noUserFound = false;
  editMode: any = false;
  title: string;
  isLoading = false;
  errorMsg;
  selectedUser = null;
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService) {
                super();
               }

  ngOnInit(): void {
    this.title = 'Add New Member';
    this.form = this.formBuilder.group({
      email: [{value: '', disabled: true}, [Validators.required]],
      role: ['', Validators.required]
    });
    this.form.controls.email.enable();
    this.getRoles();

    this.form.get('email').valueChanges
      .pipe(
        debounceTime(500),
        tap((value) => {

          this.errorMsg = '';
          this.filteredUsers = [];
          this.isLoading = true;
          this.noUserFound = false


        }),
        switchMap((value: string) =>  {
          if (!value || typeof value !== 'string'){
            return of(0);
          }
          return this.userService.getSearchUserList(this.selectedGroupId, value).pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          );
        } )
        ).subscribe((data: any) => {
          if (data.length){
          this.errorMsg = '';
          this.filteredUsers = data;
          this.noUserFound = false

        }else{
          this.noUserFound = true;
        }
      });

  }

  countryClick(event: any) {
    this.selectedUser = event.option.value;
  }
  checkCountry() {
    if (!this.selectedUser || this.selectedUser !== this.form.controls.email.value) {
      this.form.controls.email.setValue(null);
      this.selectedUser = '';
    }
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
  displayFn(user): string {
    return user && user.email ? user.email : '';
  }
  getRoles(): void {
    this.userService.getAllRoles().subscribe((data: any) => {
      this.roles = data;

    });
  }
  onGroupSelect(event): void {
    this.selectedGroupId = event;
  }

  addUserToGroup(): void {
    if (this.editMode == true) {
      const u = this.form.value;

      const u1 = {
        id: this.user.id,
        user_id: u.email.user_id,
        role_id: u.role,
      };

      this.userService.updateUserRole(u1).subscribe((data: any) => {

        this.addUser.emit();
        this.snackbarService.open('Member updated successfully', 'success');
        this.title = 'Add New Member';
        this.editMode = false;
        this.form.reset();
        this.formDirective.resetForm();
      });
    }
    else {
      const u = this.form.value;
      const u1 = {
        user_id: u.email.id,
        role_id: u.role,
      };

      this.userService.addUserToGroup(this.selectedGroupId, u1).subscribe(data => {

        this.addUser.emit();
        this.snackbarService.open('Member added successfully', 'success');
        this.form.reset();
        this.formDirective.resetForm();
      }, error => {
        const errorFromServer = error.error.detail;

        this.snackbarService.open(errorFromServer, 'danger');
        this.form.reset();
        this.formDirective.resetForm();
      });
    }
  }
}

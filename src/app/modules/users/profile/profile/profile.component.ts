import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BasicForm } from '../../../../shared/models';
import { SnackbarService, UserService } from '../../../../shared/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BasicForm implements OnInit {
  private destroy = new Subject<void>();
  user = null;
  isChecked = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService
  ) { super(); }

  ngOnInit(): void {

    setTimeout(() => {
      this.getUser();
    }, 1000);
    this.form  = this.formBuilder.group({
      first_name:['', Validators.required],
      last_name: ['', Validators.required],
      is_searchable:['', [Validators.required]],
      group_name: ['', Validators.required],
      phone_number: ['', []],
      email: ['', Validators.required],
     });

    // this.getAddressList()

  }


  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
  getUser(){
    this.userService.currentUser
        .pipe(takeUntil(this.destroy)).subscribe(user => {

          this.user = user
        });

    this.isChecked=this.user.is_searchable;
    this.patchFormValues();
  }
  patchFormValues() {
    this.form.patchValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      is_searchable: this.user.is_searchable,
      group_name: this.user.group_name,
      phone_number : this.user.phone_number,
      email: this.user.email
    });
  }

  saveBasicInfo(){

    this.userService.updateUserProfile(this.form.value).subscribe(data=>{
      this.user = data;
      this.patchFormValues()
      this.snackbarService.open("Profile updated successfully.",'success')
      this.userService.setUser(true);
    }, error => {

      this.snackbarService.open(error.error.detail,'danger')
    })
  }

}

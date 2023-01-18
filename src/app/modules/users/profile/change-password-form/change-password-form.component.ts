import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective  } from '@angular/forms';
import { SnackbarService, UserService } from '../../../../shared/services';
import { UserFormValidator } from '../../../../shared/validators';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {

  passwordForm:FormGroup;
  hide = true;
  hidee= true;
  constructor(private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.passwordForm= this.formBuilder.group({
      old_password:['', [Validators.required, Validators.minLength(8), UserFormValidator.passwordValidator]],
      new_password1:  ['', [Validators.required, Validators.minLength(8), UserFormValidator.passwordValidator]],
      new_password2:['', [Validators.required]]
    }, {
      validators: UserFormValidator.matchPassword('new_password1', 'new_password2')
    })
  }

  updatePassword(){


    this.userService.changePassword(
      {
        'old_password': this.passwordForm.controls['old_password'].value,
        'new_password': this.passwordForm.controls['new_password1'].value
      }).subscribe((data: any) => {
        // this.showDialog()

       this.snackbarService.open('Password Updated Successfully!!','success')
      },
        error => {

         this.snackbarService.open(error.error.detail,'danger')
        })

        this.passwordForm.reset();
  }


  getOldPasswordErrorMessage() {
    return this.passwordForm.controls['old_password'].hasError('required') ? 'You must enter Current Password' :
        this.passwordForm.controls['old_password'].hasError('invalidPassword') ? 'Type your current password' :
           '';
  }

  getNewPassword1ErrorMessage(){
      return this.passwordForm.controls['new_password1'].errors['required']? 'Password is required.' :
            this.passwordForm.controls['new_password1'].errors['mustMatch'] ? 'Password does not matched' :
             'A minimum 8 characters password contains a combination of Uppercase and Lowercase letter and Number are required.'
      '';
  }

  getNewPassword2ErrorMessage(){
    return this.passwordForm.controls['new_password2'].errors['required']? 'Re-enter your New Password.' :
    this.passwordForm.controls['new_password2'].errors['mustMatch'] ? 'Password does not matched' :
     'A minimum 8 characters password contains a combination of Uppercase and Lowercase letter and Number are required.'
  }

}

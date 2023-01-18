import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, SnackbarService } from '../../../shared/services';
import { BasicForm } from '../../../shared/models';
import { UserFormValidator } from '../../../shared/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BasicForm implements OnInit {
  resetToken: null;
  tokenVerified = false;
  hide = true;
  hidee = true;
  message: string;
  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService
  ) {
    super();
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.resetToken = params.token;

      this.VerifyToken();
    });
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), UserFormValidator.passwordValidator]],
      confirm_password: ['', [Validators.required]]

    }, {
      validators: UserFormValidator.matchPassword('password', 'confirm_password')
    });

  }
  VerifyToken() {
    this.authService.ValidResetPasswordToken({ token: this.resetToken }).subscribe(
      data => {

        this.tokenVerified = true;
      },
      err => {
        this.tokenVerified = false;


        this.message = 'Verification token is not valid or has expired'



      }
    );
  }


  public onSubmit() {

    this.authService.resetPassword(this.resetToken, { password: this.form.controls['password'].value }).pipe(first())
      .subscribe(data => {

        this.router.navigate(['auth/login']);
        this.snackbarService.open('Password changed successfully', 'success');
        this.form.reset();


      }, error => {
      });


  }


}

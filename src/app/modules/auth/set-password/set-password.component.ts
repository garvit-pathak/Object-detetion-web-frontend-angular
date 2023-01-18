import { Component, OnInit } from '@angular/core';

import { UserFormValidator } from '../../../shared/validators/user-form.validator';

import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, SnackbarService } from '../../../shared/services';
import { BasicForm } from '../../../shared/models';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent extends BasicForm implements OnInit {
  resetToken: null;
  tokenVerified = true;
  hide = true;
  hidee = true;
  message: string;
  constructor(private authService: AuthService,
              private snackbarService: SnackbarService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
  ) {
    super();
  }


  ngOnInit() {
    console.log('ngonit');
    
    this.route.params.subscribe(params => {
      console.log('params',params.token);
      this.resetToken = params.token;
      this.VerifyToken();
      console.log('last');
    });

    console.log('form');
    this.form = this.formBuilder.group({
     
      
      password: ['', [Validators.required, Validators.minLength(8), UserFormValidator.passwordValidator]],
      confirm_password: ['', [Validators.required]]
      
    }, {
      validators: UserFormValidator.matchPassword('password', 'confirm_password')
    });

  }

  VerifyToken() {
    console.log('verify');
    
    this.authService.ValidSetPasswordToken({ token: this.resetToken }).subscribe(
      data => {
        console.log('ver');
        


        this.tokenVerified = true;

      },
      err => {
        this.tokenVerified = false;
        this.message = 'Verification token is not valid or has expired'
        this.tokenVerified = false;
      }
    );
  }


  public onSubmit() {
    console.log('reset',this.resetToken);
    
    console.log('onsubmit', this.form.controls['password'].value);
    this.authService.setPassword(this.resetToken, { password: this.form.controls['password'].value }).subscribe(data => {console.log('data',data);
    })

    this.authService.setPassword(this.resetToken, { password: this.form.controls['password'].value }).pipe(first())
      .subscribe(data => {

        this.router.navigate(['auth/login']);
        this.form.reset();
      }, error => {

      });


  }


}

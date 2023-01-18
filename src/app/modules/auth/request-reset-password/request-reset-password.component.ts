import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services';
import { BasicForm } from '../../../shared/models';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent extends BasicForm implements OnInit {
  requestSent = false;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder, )  {
      super();
    }

  ngOnInit() {
    this.form  = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z])?)*$')] ],

  });
  }
  public onSubmit() {
    if (this.form.invalid) {return; }

    this.requestSent = true;
    this.authService.requestReset(this.form.value).pipe(first()).subscribe(data => {
    }, error => {
    });
  }
}

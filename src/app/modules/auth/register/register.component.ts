import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services';
import { BasicForm } from '../../../shared/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BasicForm implements OnInit {
  errorMessage: string;
  displayPrivacy = false;
  requestSent = false;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder
    ) {
    super();
  }
  ngOnInit() {
    
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required,
      Validators.email]]
    });
  }
  public toCapitalize(word: string) {
    const k = word[0].toUpperCase() + word.slice(1);
    return k;
  }

  public onSubmit() {
    if (this.form.invalid) {return; }

    const u = this.form.value;
    const u1 = {
        first_name: this.toCapitalize(u.first_name),
        last_name: this.toCapitalize(u.last_name),
        email: u.email.toUpperCase(),
        password: u.password

      };

    this.authService.register(u1)
        .pipe(first())
        .subscribe(
          data => {
            this.requestSent = true;
          },
          error => {
            if (error.error.detail) {
              this.errorMessage = error.error.detail;
            } else {
              this.setServerError(error);
            }
          });
  }
}

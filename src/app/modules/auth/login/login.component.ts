import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicForm } from '../../../shared/models';
import { AuthService, FirebaseMessagingService, SnackbarService, UserService } from '../../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasicForm implements OnInit {
  returnUrl;
  hide = true;
  invalidLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private userService: UserService,
    private messagingService: FirebaseMessagingService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]], // admin
      password: ['', [Validators.required]]
  });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'dashboard';
  }
  onSubmit() {
    if (this.form.invalid) {return; }

    this.authService.login(this.form.value)
    .subscribe(success => {
    this.messagingService.requestPermission();
      
      this.snackbarService.open('Welcome to Xtract','success')
        this.authService.UserLoggedIn(success);

      this.userService.setUser()
        this.router.navigate([this.returnUrl]);
        window.location.reload()
    }, error => {
      this.invalidLogin = true;

    });
  }


}

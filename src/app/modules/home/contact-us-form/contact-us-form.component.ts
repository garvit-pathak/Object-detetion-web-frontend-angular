import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { BasicForm } from '../../../shared/models';
import { SnackbarService, UserService } from '../../../shared/services';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent extends BasicForm implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      query: ['', Validators.required],
      organization: [''],
    });
  }
  onSubmit() {
    if (this.form.invalid) { return; }
    this.userService.createQuery(this.form.value).subscribe(data => {
      this.snackBar.open('Your query has successfully submitted. We will reach you soon.', 'success')
      this.formGroupDirective.resetForm();
    }, err => {
      
      if (err.error.detail) {
        
        this.snackBar.open('Failed to raise query. Please try again.', 'danger')
      } else {
        this.setServerError(err);
      }

    });
  }

}

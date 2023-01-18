import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export abstract class BasicForm {
  form: FormGroup;
  submitted = false; // a flag to be used in template to indicate whether the user tried to submit the form

  public hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  resetForm() {
    this.form.reset();
  }
  get f() { return this.form.controls; }
  onSubmit() {

    this.submitted = true;
    if (this.form.invalid) {

      return;
    }

  }

  getError(controlName: string, errorName: string){


    return this.form.get(controlName).errors[errorName]
  }

  setServerError(err){


    if (err instanceof HttpErrorResponse) {

      const errorMessages = new Array<{ propName: string; errors: string }>();


      if (err.status === 400) {
        // TODO: extract errors here and match onto the form
        Object.keys(err.error).forEach(prop => {


          const formControl = this.form.get(prop);
          if (formControl) {
            // activate the error message
            formControl.setErrors({
              serverError: err.error[prop][0]
            });


          }
        });
      }
    }
  }

}

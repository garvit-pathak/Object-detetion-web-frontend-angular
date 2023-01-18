import { FormGroup } from '@angular/forms';

export class UserFormValidator{
    static passwordValidator(password):any{
        if (password.pristine) {
            return null;
         }

        const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
        password.markAsTouched();

        if (PASSWORD_REGEX.test(password.value)) {
            return null;
         }
         return {
            invalidPassword: true
         };
    }


    // Validates passwords
    static matchPassword(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: 'Passward does not match' });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}

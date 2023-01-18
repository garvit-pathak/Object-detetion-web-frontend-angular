import { FormGroup } from '@angular/forms';
export class MeterValidator {
  static modelValidator(formCtrlOne, formCtrlTwo) {
      return (fg: FormGroup) => {
          // Select the two form conrols from the form group
          // on which the comparison is to be performed.
          const fieldOne = fg.controls[formCtrlOne];
          const fieldTwo = fg.controls[formCtrlTwo];


          let isValid = false;
          let flag = 0;
          fieldTwo.value.forEach(element => {
            if (element.model) {
              flag = flag + 1;
            } else {
              flag = flag  - 1;
            }
          });

          if (fieldTwo.value.length === Math.abs(flag)) {
            isValid = true;

          }

          if (fieldOne && fieldTwo) {


            if (fieldOne.value && !isValid) {
                  if (fieldOne.value === 'A') {
                    return fieldOne.setErrors({
                      ...fieldOne.errors,
                      ...{ model_mismatch: '1 or 0 models must be selected in type A' }

                  });
                }

                  if (fieldOne.value === 'B' ) {
                    return fieldOne.setErrors({
                      ...fieldOne.errors,
                      ...{ model_mismatch: '3 or 0 models must be selected in type B' }

                  });
                  }
                  if ( fieldOne.value === 'C') {
                    return fieldOne.setErrors({
                      ...fieldOne.errors,
                      ...{ model_mismatch: '4 or 0 models must be selected in type C' }

                  });
                  }


              } else {


                let fieldOneError = {...fieldOne.errors};
                delete(fieldOneError.model_mismatch);
                        // If there is no keys in the error object,
                        // it means that the control has no error
                        // In that case set the object as null
                        // Setting null as error to a form field
                        // makes the form control valid
                fieldOneError =
                            Object.keys(fieldOneError).length > 0 ?
                                fieldOneError : null;
                fieldOne.setErrors(fieldOneError);

                let fieldTwoError = {...fieldTwo.errors};
                delete(fieldTwoError.model_mismatch);
                fieldTwoError =
                            Object.keys(fieldTwoError).length > 0 ?
                                fieldTwoError : null;
                fieldTwo.setErrors(fieldTwoError);
              }
          }
      };
  }
}

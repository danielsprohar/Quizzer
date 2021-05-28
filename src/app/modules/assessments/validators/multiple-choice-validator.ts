import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms'

const fn = (control: AbstractControl): ValidationErrors | null => {
  const options = control.get('options') as FormArray
  const atLeaseOneSelected = options.controls.some(
    (ctrl) => ctrl.get('isSelected')?.value
  )

  return atLeaseOneSelected ? null : { noSelection: true }
}

/**
 * Ensures that a multiple choice Question form
 * has at lease one selection
 */
export const multipleChoiceValidator: ValidatorFn = fn

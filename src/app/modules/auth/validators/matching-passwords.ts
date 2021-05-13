import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchingPasswordsValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) {
    return { incongruentPasswords: true };
  }

  const password = passwordControl.value as string;
  const confirmPassword = confirmPasswordControl.value as string;

  return password !== confirmPassword ? { incongruentPasswords: true } : null;
};

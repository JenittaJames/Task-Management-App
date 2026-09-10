import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    let stripped = control.value.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
    return stripped.length === 0 ? { 'whitespace': true } : null;
  };
}

export function htmlMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    let stripped = control.value.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
    return stripped.length >= minLength ? null : { 'minlength': { requiredLength: minLength, actualLength: stripped.length } };
  };
}
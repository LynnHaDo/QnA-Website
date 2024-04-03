import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidators {
    // Check trimmed version (no trailing spaces) of input
    static checkWhitespace(minlength: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const violated = !control.value || control.value.trim() === "" || control.value.trim().length < minlength;
            return violated ? { checkWhitespace: true } : null;
        }
    }

    // Check passwords mismatch
    static checkMismatch(pwControl: AbstractControl): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const violated = control.value !== pwControl.value;
            return violated ? { checkMismatch: true } : null;
        }
    }

}

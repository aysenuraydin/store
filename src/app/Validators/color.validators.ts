import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ColorValidators {

    static isValid(control: AbstractControl): ValidationErrors | null {
        const v = control.value as string;

        if(v.startsWith('#')) {
            return null;
        }else {
            return {
              isValid: true
            }
        }
    }
}

import { FormControl, ValidationErrors } from "@angular/forms";

export class CheckoutValidators {
    //whitespace validation
    static isOnlyWhiteSpace(control: FormControl): ValidationErrors {
        //check if have only whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {
            //invalid
            return { 'isOnlyWhiteSpace': true }
        } else {
            //valid
            return null;
        }

    }
}

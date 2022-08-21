import { FormGroup } from "@angular/forms";

export function formValidator(form: FormGroup): boolean {

    if (form.valid)
        return true
    else {
        markAllAsDirty(form);
        return false;
    }

}

export function markAllAsDirty(form: FormGroup): void {

    Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsDirty();
        if (form.controls[key] instanceof FormGroup)
            markAllAsDirty(form.controls[key] as FormGroup);
    });

}

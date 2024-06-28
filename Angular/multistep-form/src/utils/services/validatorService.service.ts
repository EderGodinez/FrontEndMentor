import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorService {
  constructor() { }
  isValidField( MyForm:FormGroup,field: string ): boolean | null {
    return MyForm.controls[field].errors
      && MyForm.controls[field].touched;
  }

  getFieldError( MyForm:FormGroup,field: string): string | null {
    if ( !MyForm.controls[field] ) return null;
    const errors = MyForm.controls[field].errors || {};
    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Campo requere mínimo ${ errors['minlength'].actualLength }/${ errors['minlength'].requiredLength } caracters.`;
        case 'maxlength':
          return `Máximo ${errors['maxlength'].actualLength}/${errors['maxlength'].requiredLength} caracteres.`;
        case 'min':
              return `La cantidad debe der de minimo ${ errors['min'].min } .`;
        case 'max':
              return `La cantidad maxima no debe sobrepasar ${ errors['max'].max }.`;
        case 'pattern':
                return `Formato de campo invalido.`;
          case 'email':
            return 'Correo invalido'
      }
    }
    return null;
  }
}

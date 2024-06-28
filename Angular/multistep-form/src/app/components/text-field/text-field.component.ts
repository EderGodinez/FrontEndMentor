import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ]
})
export class TextFieldComponent {
   @Input() ClassName!: string;
  @Input() placeholder?: string;
  @Input() type: string = 'text';
  @Input() value: string = '';


  // Propagación del cambio de valor
  onChange: any = () => {};
  onTouched: any = () => {};

  // Escribe el valor desde el modelo en la vista
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onInput(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (this.type === 'number') {
      if (inputElement.value.length >= 11) {
        inputElement.value = inputElement.value.slice(0, 10);
        return;
      }
    }
    this.value = inputElement.value;
    this.onChange(inputElement.value);
    //this.valueChange.emit(inputElement.value);
  }
  onBlur() {
    this.onTouched();
  }
}

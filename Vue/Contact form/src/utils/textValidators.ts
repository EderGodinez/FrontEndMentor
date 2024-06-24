// src/Validator.ts
export default class Validator {
    private static errors: Record<string, string> = {};
  
    static required(value: any): string {
      if (!value || value.length === 0) {
        return 'This field is required';
      }
      return '';
    }
    static minLength(min: number) {
      return (value: string): string => {
        if (value.length < min) {
          return `This field must be at least ${value.length}/${min} characters long`;
        }
        return '';
      };
    }
    static maxLength(max: number) {
      return (value: string): string => {
        if (value.length > max) {
          return `This field must be no more than ${max}/${value.length} characters long`;
        }
        return '';
      };
    }
    static email(value: any): string {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'This field must be a valid email address';
      }
      return '';
    }
    static validateField(fieldName: string, value: any, rules: Array<(value: any) => string>) {
      for (const rule of rules) {
        const error = rule(value);
        if (error) {
          this.errors[fieldName] = error;
          return;
        }
      }
      this.errors[fieldName] = '';
    }
  
    static getErrors() {
      return this.errors;
    }
  
    static hasErrors() {
      return Object.values(this.errors).some(error => error !== '');
    }
  
    static reset() {
      this.errors = {};
    }
  }
  
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InfoFormResponse } from 'src/interfaces/InfoFormResponse.interface';
import { ValidatorService } from '../../../utils/services/validatorService.service';

@Component({
  selector: 'info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss']
})

export class InfoFormComponent implements OnInit {
  constructor(private readonly FB:FormBuilder,private readonly ValidatorService:ValidatorService) {

   }
  ngOnInit(): void {
    if (localStorage.getItem('UserInfo')) {

  }
  const storedUserInfo = localStorage.getItem('UserInfo');
const userinfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  if (userinfo) {
    const {Name,Email,Phone}=userinfo.personalInfo;
      this.infoForm.get('Name')?.setValue(Name?Name:'');
      this.infoForm.get('email')?.setValue(Email?Email:'');
      this.infoForm.get('phone')?.setValue(Phone?Phone:'')
}
}
@Output() nextStep=new EventEmitter<InfoFormResponse>();
infoForm=this.FB.group({
  Name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(30),Validators.pattern('^[a-zA-Z ]*$')]],
  email:['',[Validators.required,Validators.email]],
  phone:['',[Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(10),Validators.maxLength(10)]]
});
navigateNext() {
  const {Name,email,phone}=this.infoForm.value;
  this.infoForm.markAllAsTouched();
  if (this.infoForm.invalid) {
    return;
  }
    this.nextStep.emit({
      PageNumber:1,
      data:{
        personalInfo:{
          Email:email,
          Name,
          Phone:phone
      }}
    });
}
IsValidField(fieldName:string){
  return this.ValidatorService.isValidField(this.infoForm,fieldName,);
}
getErrorMessage(fieldName:string){
  return this.ValidatorService.getFieldError(this.infoForm,fieldName);
}
getValue(fieldName:string){
  return this.infoForm.get(fieldName)?.value;
}}

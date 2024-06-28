import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../utils/services/validatorService.service';
import { InfoFormResponse, PlanCardProps } from 'src/interfaces';
import deepEqual from 'src/utils/objComparator';

@Component({
  selector: 'plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {
constructor(private readonly FB:FormBuilder,private readonly ValidatorService:ValidatorService) { }
ngOnInit(): void {
  const storedUserInfo = localStorage.getItem('UserInfo');
const userinfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  if (userinfo) {
    this.planForm.get('selectedPlan')?.setValue(userinfo.plan.selectedPlan);
    this.planForm.get('IsMountlyPlan')?.setValue(userinfo.plan.IsMountlyPlan);
}
}
@Output() ChangeStep=new EventEmitter<InfoFormResponse>();

planForm:FormGroup=this.FB.group({
  selectedPlan:['',[Validators.required]],
  IsMountlyPlan:[true]
});
plans: PlanCardProps[] = [
  { title: 'Arcade', Montlyprice: '9', logo: '/assets/images/icon-arcade.svg', info: '2 months free' },
  { title: 'Advance', Montlyprice: '12', logo: '/assets/images/icon-advanced.svg', info: '2 months free' },
  { title: 'Pro', Montlyprice: '15', logo: '/assets/images/icon-pro.svg', info: '2 months free' },
];
setPlan($event:PlanCardProps){
  this.planForm.get('selectedPlan')?.setValue($event);
}
get planSelected():PlanCardProps{
  return this.planForm.get('selectedPlan')?.value;

}
navigateNext() {
  const {selectedPlan,IsMountlyPlan}=this.planForm.value;
  this.planForm.markAllAsTouched();
  if (this.planForm.invalid) {
    return;
  }
  if (!IsMountlyPlan) {
    this.planForm.get('IsMountlyPlan')?.setValue(false);
  }
    this.ChangeStep.emit({
      PageNumber:2,
      data:{
        plan:this.planForm.value

    }
    });
}
IsValidField(fieldName:string){
  return this.ValidatorService.isValidField(this.planForm,fieldName,);
}
getErrorMessage(fieldName:string){
  return this.ValidatorService.getFieldError(this.planForm,fieldName);
}
GoBack(){
  this.ChangeStep.emit({
    PageNumber:0,
    data:{
      plan:this.planForm.value
  }
  });
}
get IsMonthly(){
  return this.planForm.get('IsMountlyPlan')?.value;
}
  AreEqual(obj1:any,obj2:any){
     return deepEqual(obj1,obj2)
  }
}

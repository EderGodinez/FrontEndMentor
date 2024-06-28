import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddonsForm, InfoForm, PlanCardProps, PlanForm } from 'src/interfaces';
import { AddsCardProps } from 'src/interfaces/AddCardProp.interface';
import { ValidatorService } from 'src/utils/services/validatorService.service';
interface UserInformation {
  personalInfo: InfoForm;
  plan: PlanForm;
  addons: AddonsForm;
}
@Component({
  selector: 'summary-form',
  templateUrl: './summary-form.component.html',
  styleUrls: ['./summary-form.component.scss']
})
export class SummaryFormComponent {
  constructor(private readonly FB:FormBuilder,private readonly ValidatorService:ValidatorService) { }
  ngOnInit(): void {
    const storedUserInfo = localStorage.getItem('UserInfo');
  const user = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  console.log(user);
    if (user) {
      this.UserInfo = {...user};
      console.log()
    }
  }
  @Output() ChangeStep=new EventEmitter<any>();
  UserInfo: any = {
    personalInfo: {},
    plan: {},
    addons: {},
  };

  navigateStep(step:number) {
    console.log(step);
      this.ChangeStep.emit({
        PageNumber:step,
      });
  }
 get AddsSelected():AddsCardProps[]{
   return this.UserInfo.addons.Selected?this.UserInfo.addons.Selected:[];
  }
  getPrice(Montlyprice:string):number{
    const MontlyPlan = parseInt(Montlyprice);
    return this.UserInfo.plan.IsMountlyPlan?MontlyPlan:MontlyPlan*10;
  }
  get titlePlan():string{
    return this.UserInfo.plan.selectedPlan.title
  }
  get ServicePrice():number{
    console.log(this.UserInfo.plan.SelectedPlan);
    return this.UserInfo.plan.IsMountlyPlan?this.UserInfo.plan.selectedPlan.Montlyprice:this.UserInfo.plan.selectedPlan.Montlyprice*10
  }
  get TotalPrice():number{
    const ServicePrice = this.ServicePrice;
    const AddsPrice = this.AddsSelected.reduce((acc,curr)=>acc+parseInt(curr.Montlyprice),0)*10;
    console.log(ServicePrice,AddsPrice);
    return ServicePrice+AddsPrice;
  }
}



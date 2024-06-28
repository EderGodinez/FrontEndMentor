import { Component } from '@angular/core';
import { AddonsForm, InfoForm, PlanForm } from 'src/interfaces';
interface UserInformation {
  personalInfo: InfoForm;
  plan: PlanForm;
  addson: AddonsForm;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  CurrentForm: number = 0;
  previousForm: number = 1;
  UserInfo: UserInformation = {
    personalInfo: {},
    plan: {},
    addson: {},
  };
  stepTitles:string[] = ['your info','select plan','add-ons','summary' ]

  navigateStep(step:number){
    this.previousForm = this.CurrentForm;
    this.CurrentForm = step;
  }
NavigateToForm($event:any){
  const {data,PageNumber} = $event;
  //SET THE DATA TO THE USERINFO OBJECT
  if (data) {
    const objKey = Object.keys(data);
    console.log(objKey);
    this.UserInfo[objKey[0]] = data[objKey[0]];
    localStorage.setItem('UserInfo',JSON.stringify(this.UserInfo));
  }
  //Change the step
  this.navigateStep(PageNumber);
  }
}

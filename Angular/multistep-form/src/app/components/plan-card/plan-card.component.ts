import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PlanCardProps } from 'src/interfaces';

@Component({
  selector: 'plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent {
@Input() plan!: PlanCardProps;
@Input() IsMonthly!: boolean;
@Input() isSelected!: boolean;
@Output() PlanSelected=new EventEmitter<PlanCardProps>();
@ViewChild('planCard') planCardContainer:ElementRef | undefined;
get YearlyPrice():number{
  return parseInt(this.plan.Montlyprice)* 10;
}
get getPrice(){
  return this.IsMonthly? this.plan.Montlyprice : this.YearlyPrice;
}
selectPlan(){
  this.planCardContainer?.nativeElement.classList.add('selected');
  // this.planCardContainer?.nativeElement.classList.remove('selected');
  this.PlanSelected.emit(this.plan);
}}

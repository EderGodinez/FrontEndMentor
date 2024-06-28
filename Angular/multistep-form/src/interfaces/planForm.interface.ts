import { PlanCardProps } from "./planCardProps.interface";

export interface PlanForm{
  plan?:{
    SelectedPlan:PlanCardProps;
    IsMonthly:boolean
  }
}

import { AddonsForm } from "./AddsOn.interface";
import { Base } from "./Base.interface";
import { InfoForm } from "./infoForm.interface";
import { PlanForm } from "./planForm.interface";

export interface InfoFormResponse extends Base{
  data?:InfoForm|PlanForm|AddonsForm
}

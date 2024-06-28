import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { InfoFormComponent } from './components/info-form/info-form.component';
import { PlanFormComponent } from './components/plan-form/plan-form.component';
import { AddsFormComponent } from './components/adds-form/adds-form.component';
import { SummaryFormComponent } from './components/summary-form/summary-form.component';
import { FinalFormComponent } from './components/final-form/final-form.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanCardComponent } from './components/plan-card/plan-card.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoFormComponent,
    PlanFormComponent,
    AddsFormComponent,
    SummaryFormComponent,
    FinalFormComponent,
    TextFieldComponent,
    PlanCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

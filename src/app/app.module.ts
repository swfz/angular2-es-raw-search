import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as bootstrap from 'ng2-bootstrap';
import { DatePickerModule } from 'ng2-datepicker';

import { AppComponent } from './app.component';
import { EsSearchService } from "./services/es-search.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    bootstrap.AlertModule.forRoot(),
    bootstrap.ButtonsModule.forRoot(),
    bootstrap.CollapseModule.forRoot(),
    bootstrap.DatepickerModule.forRoot(),
    bootstrap.DropdownModule.forRoot(),
    bootstrap.ModalModule.forRoot(),
    bootstrap.PaginationModule.forRoot(),
    bootstrap.TooltipModule.forRoot(),
    bootstrap.RatingModule.forRoot(),
    bootstrap.TabsModule.forRoot(),
    bootstrap.TimepickerModule.forRoot(),
    bootstrap.TypeaheadModule.forRoot(),
    DatePickerModule,
  ],
  providers: [
    EsSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

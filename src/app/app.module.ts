import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgGridModule } from "ag-grid-angular/main";

import { AppRoutingModule } from "./app-routing.module";

import * as bootstrap from 'ng2-bootstrap';
import { AppComponent } from './app.component';
import { EsSearchService } from "./services/es-search.service";

import { AgGridComponent } from './components/ag-grid/ag-grid.component';
import {
  AgGridCellJsonDataComponent,
  AgGridCellSearchParamsComponent
} from './components/ag-grid/ag-grid-cell';

import { PageNotFoundComponent } from "./components/page-not-found.component";
import { TwitterApiComponent } from "./components/twitter-api/twitter-api.component";
import { TwitterApiService } from "./components/twitter-api/twitter-api.service";
import { AccessLogComponent } from './components/access-log/access-log.component';
import { AccessLogService } from "./components/access-log/access-log.service";


@NgModule({
  declarations: [
    AppComponent,
    AgGridComponent,
    AgGridCellJsonDataComponent,
    AgGridCellSearchParamsComponent,
    TwitterApiComponent,
    PageNotFoundComponent,
    AccessLogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AgGridModule.withComponents([AgGridCellJsonDataComponent,AgGridCellSearchParamsComponent]),
    bootstrap.AccordionModule.forRoot(),
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
  ],
  providers: [
    TwitterApiService,
    AccessLogService,
    EsSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

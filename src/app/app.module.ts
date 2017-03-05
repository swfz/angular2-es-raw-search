import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgGridModule } from "ag-grid-angular/main";

import * as bootstrap from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { AgGridComponent } from './components/ag-grid/ag-grid.component';

import { EsSearchService } from "./services/es-search.service";
import { AgGridCellJsonDataComponent } from './components/ag-grid/ag-grid-cell/ag-grid-cell-json-data/ag-grid-cell-json-data.component';
import { AgGridCellSearchParamsComponent } from './components/ag-grid/ag-grid-cell/ag-grid-cell-search-params/ag-grid-cell-search-params.component';

@NgModule({
  declarations: [
    AppComponent,
    AgGridComponent,
    AgGridCellJsonDataComponent,
    AgGridCellSearchParamsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
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
    EsSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

///<reference path="ag-grid-cell/ag-grid-cell-json-data/ag-grid-cell-json-data.component.ts"/>
import {Component, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {GridOptions, Grid } from "ag-grid";
import {AgGridCellJsonDataComponent} from "./ag-grid-cell/ag-grid-cell-json-data/ag-grid-cell-json-data.component";
import {AgGridCellSearchParamsComponent} from "./ag-grid-cell/ag-grid-cell-search-params/ag-grid-cell-search-params.component";

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnChanges {
  @Input() searchedData: any;
  @Input() isSearching: boolean;
  @Output() isSearchingChange = new EventEmitter<boolean>();

  private gridOptions: GridOptions;

  constructor(
  ) {
    this.gridOptions = <GridOptions>{
      enableSorting :true,
      enableFilter :true,
      enableColResize :true,
      rowHeight :30,
      enableCellChangeFlash :true,
      //Enterprise
      enableStatusBar :true,
      enableRangeSelection :true
    };
    this.gridOptions.columnDefs = [
      {
        headerName: "finished",
        field: "finished",
        width: 150
      },
      {
        headerName: "account ID",
        field: "account_id",
        width: 100
      },
      {
        headerName: "method",
        field: "payload_request_method",
        width: 100
      },
      {
        headerName: "path",
        field: "payload_request_path",
        cellRendererFramework: AgGridCellSearchParamsComponent,
        width: 100
      },
      {
        headerName: "request body",
        field: "payload_request_body_0",
        cellRendererFramework: AgGridCellSearchParamsComponent,
        width: 100
      },
      {
        headerName: "code",
        field: "payload_response_code",
        width: 100
      },
      {
        headerName: "response body",
        field: "payload_response_body",
        cellRendererFramework: AgGridCellJsonDataComponent,
        width: 400
      }

    ];
    this.gridOptions.rowData = this.searchedData;

  }

  ngOnChanges(changes: any) {
    if ( this.gridOptions.api ) {
      if ( changes.searchedData ) {
        this.gridOptions.api.hideOverlay();
        this.gridOptions.api.setRowData(this.searchedData);
        this.isSearchingChange.emit(false);
      }

      if ( changes.isSearching ) {
        this.gridOptions.api.showLoadingOverlay();
      }
    }
  }

}

///<reference path="ag-grid-cell/ag-grid-cell-json-data/ag-grid-cell-json-data.component.ts"/>
import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {GridOptions, Grid } from "ag-grid";
import {AgGridCellJsonDataComponent} from "./ag-grid-cell/ag-grid-cell-json-data/ag-grid-cell-json-data.component";

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnChanges {
  @Input() searchedData: any;

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
        width: 100
      },
      {
        headerName: "request body",
        field: "payload_request_body_0",
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
//        enableTooltip : true,
        width: 400
      }

    ];
    this.gridOptions.rowData = this.searchedData;
//    this.gridOptions.rowData = [
//      [5,10],
//      [10,15],
//      [18,30]
//    ]
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    console.log('changed');
    console.log(changes);
//    this.gridOptions.rowData = this.searchedData;
    if ( this.gridOptions.api ) {
      this.gridOptions.api.setRowData(this.searchedData);
    }
//    this.resultGrid.api.refreshView();
//    this.gridOptions.api.setRowData(this.searchedData);
    console.log(this.gridOptions.rowData);
  }

  debug(): void {
    console.log('ag-grid component');
    console.log(this);
//    this.resultGrid.gridOptions.api.refreshView();
    console.log( typeof (this.gridOptions.api.setRowData) === 'function')
    this.gridOptions.api.setRowData(this.searchedData);
  }

}

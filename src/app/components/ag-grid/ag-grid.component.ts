import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid";

@Component({
  selector: 'ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {
  private gridOptions: GridOptions;

  constructor() {
    this.gridOptions = {};
    this.gridOptions.columnDefs = [
      {
        headerName: "ID",
        field: "id",
        width: 100
      },
      {
        headerName: "Value",
        field: "value",
//        cellRendererFramework: RedComponentComponent,
        width: 100
      },

    ];
    this.gridOptions.rowData = [
      {id: 5, value: 10},
      {id: 10, value: 15},
      {id: 15, value: 20}
    ]
  }

  ngOnInit() {
  }

}
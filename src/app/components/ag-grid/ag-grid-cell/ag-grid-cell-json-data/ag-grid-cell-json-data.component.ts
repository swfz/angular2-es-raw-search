import { Component } from '@angular/core';

@Component({
  selector: 'ag-grid-cell-json-data',
  templateUrl: './ag-grid-cell-json-data.component.html',
  styleUrls: ['./ag-grid-cell-json-data.component.scss']
})
export class AgGridCellJsonDataComponent {
  private params: any;
  private formattedJson: string;
  private headerName: string;

  agInit(params: any): void {
    this.params = params;
    let jsonObject = JSON.parse(params.value);
    this.formattedJson = JSON.stringify(jsonObject,null,"\t");
    this.headerName = params.colDef.headerName;
  }

  constructor() { }
}

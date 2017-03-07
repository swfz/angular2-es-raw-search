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
    try {
      let jsonObject = JSON.parse(params.value);
      this.formattedJson = JSON.stringify(jsonObject,null,"\t");
    }
    catch(e) {
      this.formattedJson = params.value;
      console.log("Error: " + e);
    }
    this.headerName = params.colDef.headerName;
  }

  constructor() { }
}

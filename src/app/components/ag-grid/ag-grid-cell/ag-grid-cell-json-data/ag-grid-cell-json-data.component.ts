import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ag-grid-cell-json-data',
  templateUrl: './ag-grid-cell-json-data.component.html',
  styleUrls: ['./ag-grid-cell-json-data.component.scss']
})
export class AgGridCellJsonDataComponent implements OnInit {
  private params: any;

  agInit(params: any): void {
    console.log('cell');
    console.log(params);
    this.params = params;
  }

  constructor() { }

  ngOnInit() {
  }



}

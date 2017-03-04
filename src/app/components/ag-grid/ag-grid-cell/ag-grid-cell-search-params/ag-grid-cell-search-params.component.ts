import { Component } from '@angular/core';
import {URLSearchParams} from "@angular/http";


@Component({
  selector: 'ag-grid-cell-search-params',
  templateUrl: './ag-grid-cell-search-params.component.html',
  styleUrls: ['./ag-grid-cell-search-params.component.scss']
})
export class AgGridCellSearchParamsComponent {
  private params: any;
  private searchParams: any;
  private headerName: string;

  agInit(params: any){
    this.params = params;

    this.searchParams = this.parseParams(params.value);
    this.headerName = params.colDef.headerName;
  }

  parseParams(searchStrings: string): any {

    let q = []
    if ( searchStrings ) {
      q = searchStrings.split('&').map( keyValueString => keyValueString.split('=').map( v => decodeURIComponent(v)) );
    }
    console.log(q);

    return q;
  }

  constructor() { }
}

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
  private path: string;

  agInit(params: any){
    this.params = params;

    this.headerName = params.colDef.headerName;

    this.path = this.parsePath(params.value);

    let body  = this.parseBody(params.value);
    this.searchParams = this.parseParams(body);
  }

  parsePath(str: string): string {
    if (str) {
      return ( this.withPath(str) ) ? str.split('?')[0] : "";
    }
  }

  parseBody(str: string): string {
    if (str) {
      return ( this.withPath(str) ) ? str.split('?')[1] : str;
    }
  }

  withPath(str: string): boolean {
    return str.split('?').length > 1  or str.match(/\//);
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

///<reference path="ag-grid-cell/ag-grid-cell-json-data/ag-grid-cell-json-data.component.ts"/>
import {Component, Input, OnChanges,AfterViewInit,SimpleChanges} from '@angular/core';
import {GridOptions} from "ag-grid";

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnChanges, AfterViewInit{
  @Input() searchedData: any;
  @Input() isSearchingToggle: boolean;
  @Input() columnDefs: any;

  private gridOptions: GridOptions;

  constructor(
  ) {
    this.gridOptions = <GridOptions>{
      enableSorting :true,
      enableFilter :true,
      enableColResize :true,
      rowHeight :50,
      enableCellChangeFlash :true,
      //Enterprise
      enableStatusBar :true,
      enableRangeSelection :true
    };
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.rowData = [];
  }

  ngAfterViewInit() {
    this.gridOptions.api.setColumnDefs(this.columnDefs);
  }

  ngOnChanges(changes: any) {
    if ( this.gridOptions.api ) {
      if ( changes.searchedData ) {
        this.gridOptions.api.hideOverlay();
        this.gridOptions.api.setRowData(this.searchedData);
      }

      if ( changes.isSearchingToggle ) {
        this.gridOptions.api.showLoadingOverlay();
      }
    }
  }
}

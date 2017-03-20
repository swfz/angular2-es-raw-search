import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {EsSearchService} from "../../services/es-search.service";
import {AccessLogService} from "./access-log.service";

@Component({
  selector: 'app-access-log',
  templateUrl: './access-log.component.html',
  styleUrls: ['./access-log.component.scss']
})
export class AccessLogComponent implements OnInit {

  private opened: boolean = false;
  public format: 'YYYY-MM-DD';
  public dateOptions: any = {
    formatYear: 'YYYY',
    startingDay: 1
  };

  private columnDefs: any;

  private searchedData: any = [];
  private totalCount: number;
  private displayCount: number;
  private isSearchingToggle: boolean = false;

  constructor(
    private esSearchService: EsSearchService,
    private accessLogService: AccessLogService
  ) { }

  ngOnInit() {
    this.columnDefs = this.accessLogService.columnDefs;
  }

  search(params: any): void {
    this.isSearchingToggle =  ( this.isSearchingToggle ) ? false : true;

    let pathName  = this.accessLogService.getPath(params);
    let jsonQuery = this.accessLogService.buildRequestBody(params);
    this.esSearchService.search(pathName,jsonQuery).subscribe(
      data => {
        this.searchedData = data.hits.hits.map(row => row._source);
        this.totalCount   = data.hits.total;
        this.displayCount = data.hits.hits.length;
      },
      error => {
        console.log('search error');
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
// import { environment } from "../environments/environment";
// import { config } from "./config";
import * as moment from 'moment';
import {EsSearchService} from "../../services/es-search.service";
import {TwitterApiService} from "./twitter-api.service"

@Component({
  selector: 'app-twitter-api',
  templateUrl: './twitter-api.component.html',
  styleUrls: ['./twitter-api.component.scss']
})
export class TwitterApiComponent implements OnInit {

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
    private twitterApiService: TwitterApiService,
    private esSearchService: EsSearchService
  ) { }

  ngOnInit(): void {
    this.columnDefs = this.twitterApiService.columnDefs;
  }

  search(params: any): void {
    this.isSearchingToggle =  ( this.isSearchingToggle ) ? false : true;

    let pathName  = this.twitterApiService.getPath(params);
    let jsonQuery = this.twitterApiService.buildRequestBody(params);
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


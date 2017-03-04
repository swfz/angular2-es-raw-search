import { Component, OnInit } from '@angular/core';
// import { environment } from "../environments/environment";
// import { config } from "./config";
import { EsSearchService } from "./services/es-search.service";
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public format: 'YYYY-MM-DD';
  public dateOptions: any = {
    formatYear: 'YYYY',
    startingDay: 1
  };
  private searchedData: any = [];

  private opened: boolean = false;

  constructor(
    private esSearchService: EsSearchService
  ) {
  }

  ngOnInit(): void {
  }

  search(params: any): void {
    this.esSearchService.search(params).subscribe(
      data => {
        this.searchedData = data.hits.hits.map(row => row._source);
        // console.log(data);
      },
      error => {
        console.log('search error');
      }
    );
  }
}


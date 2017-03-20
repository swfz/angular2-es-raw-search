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

  private opened: boolean = false;
  public format: 'YYYY-MM-DD';
  public dateOptions: any = {
    formatYear: 'YYYY',
    startingDay: 1
  };

  private searchedData: any = [];
  private totalCount: number;
  private displayCount: number;
  private isSearchingToggle: boolean = false;

  constructor(
    private esSearchService: EsSearchService
  ) {
  }

  ngOnInit(): void {
  }
}


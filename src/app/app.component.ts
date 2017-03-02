import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { EsSearchService } from "./services/es-search.service";
import { config } from "./config";
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

  private opened: boolean = false;

  constructor(
    private esSearchService: EsSearchService
  ) {

  }
  ngOnInit(): void {
    console.log(environment)
  }

  search(params: any): void {
    console.log(config);
    console.log(params.date);
    console.log(moment(params.date).format('YYYY-MM-DD'));
    console.log('called component search')
    this.esSearchService.search(params).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log('search error');
      }
    );
  }
}


import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { EsSearchService } from "./services/es-search.service";
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private date: DateModel;
  private options: DatePickerOptions;

  constructor(
    private esSearchService: EsSearchService
  ) {
    this.options = new DatePickerOptions();
  }
  ngOnInit(): void {
    console.log(environment)
  }

  search(params: any): void {
    console.log(params);
    console.log('called component search')
  }
}


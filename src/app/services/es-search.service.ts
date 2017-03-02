import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {environment} from "../../environments/environment";
import * as moment from 'moment';

@Injectable()

export class EsSearchService {
  private esUrl = environment.esUrl;
  private indices: string;

  constructor(private http: Http){}

  search(params: any): any{

    this.indices = moment(params.date).format('YYYY-MM-DD');
    let jsonQuery = this.buildQueries(params);
    let fullPath = this.esUrl + '/twitter.ads-' + this.indices + '/_search';

    //console.log(fullPath)
    return this.http.post(fullPath, jsonQuery)
      .map(this.extractData)
      .catch(this.handleError);
  }

  buildQueries(params: any): any {
    let queries = {
      "query": {
        "bool": {
          "filter": [
            {
              "term": {
                "account_id": params.account_id
              }
            }
          ]
        }
      }
    };

    return queries
  }

  extractData(res: Response) {
    if (res.status < 200 || res.status > 300 ) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json();
  }


  handleError (error: any) {
    let errMsg = error.message || 'Server error';
    return Observable.throw(errMsg);
  }
}

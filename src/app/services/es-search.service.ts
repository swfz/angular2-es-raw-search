import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {environment} from "../../environments/environment";

@Injectable()

export class EsSearchService {
  private esUrl = environment.esUrl;
//  private _client = new elasticsearch.Client

  constructor(
    private http: Http,
  ){
  }

  search(query: string): any{

    let params = {
      "query": {
        "multi_match": {
          "query": query,
          "type": "cross_fields",
          "fields": [
            "title^5",
            "heading^4",
            "text^3"
          ]
        }
      }
    };

    let fullPath = this.esUrl + '/docs/_search';
    //console.log(fullPath)
    return this.http.post(fullPath, params)
      .map(this.extractData)
      .catch(this.handleError);
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

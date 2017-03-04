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
    let jsonQuery = this.buildRequestBody(params);
    let fullPath = this.esUrl + '/twitter.ads-' + this.indices + '/_search';

    return this.http.post(fullPath, jsonQuery)
      .map(this.extractData)
      .catch(this.handleError);

  }
  buildRequestBody(params: any): any {
    let bodyParams = { "size": params.size };

    let paramsCount = Object.keys(params).filter(k => params[k].length > 0).length;
    if (paramsCount > 1) {
      bodyParams["query"] = {"bool": {"filter": []}};
    }

    if (params.account_id) {
      bodyParams["query"]["bool"]["filter"].push(
       {
          "term":
            { "account_id": params.account_id }
        }
      );
    }

    if (params.code) {
      bodyParams["query"]["bool"]["filter"].push(
        {
          "terms":
            { "payload_response_code": params.code.split(',') }
        }
      );
    }

    if (params.path) {
      bodyParams["query"]["bool"]["filter"].push(
        {
          "wildcard":
            {"payload_request_path": '*' + params.path + '*' }
        }
      );
    }

    if (params.method) {
      bodyParams["query"]["bool"]["filter"].push(
        {
          "term":
            {"payload_request_method": params.method }
        }
      );
    }

    if (params.body) {
      bodyParams["query"]["bool"]["filter"].push(
        {
          "filtered":{
            "query": {
              "query_string": {
                "analyze_wildcard": true,
                "query": params.body
              }
            }
          }
        }
      );
    }

    return bodyParams;
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

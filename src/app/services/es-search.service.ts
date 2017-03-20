import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {environment} from "../../environments/environment";

@Injectable()

export class EsSearchService {
  private esUrl = environment.esUrl;

  constructor(private http: Http){}

  search(pathName: string, jsonQuery: any): any{

    let fullPath = `${this.esUrl}/${pathName}`;
    return this.http.post(fullPath, jsonQuery)
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

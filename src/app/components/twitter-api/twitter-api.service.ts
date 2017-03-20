import {Injectable} from '@angular/core';
import {AgGridCellSearchParamsComponent,AgGridCellJsonDataComponent} from "../ag-grid/ag-grid-cell";
import * as moment from 'moment';

@Injectable()

export class TwitterApiService {
  private indicesData: any;
  public columnDefs: any;

  constructor(
  ) {
    this.indicesData = {
      dateFormat: "YYYY-MM-DD",
      prefix: "twitter.ads-"
    };

    this.columnDefs = [
      {
        headerName: "finished",
        field: "finished",
        width: 180
      },
      {
        headerName: "account ID",
        field: "account_id",
        width: 100
      },
      {
        headerName: "method",
        field: "payload_request_method",
        width: 60
      },
      {
        headerName: "path",
        field: "payload_request_path",
        cellRendererFramework: AgGridCellSearchParamsComponent,
        width: 300
      },
      {
        headerName: "request body",
        field: "payload_request_body_0",
        cellRendererFramework: AgGridCellSearchParamsComponent,
        width: 150
      },
      {
        headerName: "code",
        field: "payload_response_code",
        width: 60
      },
      {
        headerName: "response body",
        field: "payload_response_body",
        cellRendererFramework: AgGridCellJsonDataComponent,
        width: 150
      }
    ];
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
      if (params.not_code){
        bodyParams["query"]["bool"]["filter"].push(
          {
            "bool": {
              "must_not": {
                "terms": {
                  "payload_response_code": params.code.split(',')
                }
              }
            }
          }
        )
      }else{
        bodyParams["query"]["bool"]["filter"].push(
          {
            "terms":
              { "payload_response_code": params.code.split(',') }
          }
        );
      }
    }

    if (params.path) {
      if (params.not_path) {
        bodyParams["query"]["bool"]["filter"].push(
          {
            "bool": {
              "must_not": {
                "wildcard":
                  {"payload_request_path": '*' + params.path + '*' }
              }
            }
          }
        )
      } else {
        bodyParams["query"]["bool"]["filter"].push(
          {
            "wildcard":
              {"payload_request_path": '*' + params.path + '*' }
          }
        );
      }
    }

    if (params.method) {
      if (params.not_method) {
        bodyParams["query"]["bool"]["filter"].push({
          "bool": {
            "must_not": {
              "term":
                {"payload_request_method": params.method }
            }
          }
        })
      } else {
        bodyParams["query"]["bool"]["filter"].push({
          "term":
            {"payload_request_method": params.method }
        })
      }
    }

    if (params.all_columns) {
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

  getPath(params: any): string {
    let indices  = `${this.indicesData.prefix}${moment(params.date).format(this.indicesData.dateFormat)}`;
    return `${indices}/_search`;
  }

}





import {Injectable} from '@angular/core';
import {AgGridCellSearchParamsComponent,AgGridCellJsonDataComponent} from "../ag-grid/ag-grid-cell";
import * as moment from 'moment';

@Injectable()

export class AccessLogService {
  private indicesData: any;
  public columnDefs: any;

  constructor(
  ) {
    this.indicesData = {
      dateFormat: "YYYY.MM.DD",
      prefix: "logstash-"
    };

    this.columnDefs = [
      {
        headerName: "timestamp",
        field: "@timestamp",
        width: 180
      },
      {
        headerName: "host",
        field: "host",
        width: 100
      },
      {
        headerName: "method",
        field: "method",
        width: 60
      },
      {
        headerName: "path",
        field: "path",
        cellRendererFramework: AgGridCellSearchParamsComponent,
        width: 300
      },
      {
        headerName: "code",
        field: "code",
        width: 150
      },
      {
        headerName: "referer",
        field: "referer",
        width: 60
      },
      {
        headerName: "user agent",
        field: "agent",
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
                  "code": params.code.split(',')
                }
              }
            }
          }
        )
      }else{
        bodyParams["query"]["bool"]["filter"].push(
          {
            "terms":
              { "code": params.code.split(',') }
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
                  {"path": '*' + params.path + '*' }
              }
            }
          }
        )
      } else {
        bodyParams["query"]["bool"]["filter"].push(
          {
            "wildcard":
              {"path": '*' + params.path + '*' }
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
                {"method": params.method }
            }
          }
        })
      } else {
        bodyParams["query"]["bool"]["filter"].push({
          "term":
            {"method": params.method }
        })
      }
    }

    if (params.host) {
      bodyParams["query"]["bool"]["filter"].push(
        {
          "wildcard":
            {"host": '*' + params.host + '*' }
        }
      );
    }
    if (params.agent) {
      bodyParams["query"]["bool"]["filter"].push(
        {
          "wildcard":
            {"agent": '*' + params.agent + '*' }
        }
      );
    }
    if (params.referer) {
      bodyParams["query"]["bool"]["filter"].push(
        {
          "wildcard":
            {"referer": '*' + params.referer + '*' }
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


export const config = {
  "indiciesPrefix": "logstash-",
  "dateformat": "YYYY.MM.DD",
  "columns": [
    {"key": "method", "name": "method", "searchable": true, "match": "perfect"},
    {"key": "code", "name": "code", "searchable": true, "match": "perfect"},
    {"key": "path", "name": "path", "searchable": true, "match": "partial"},
    {"key": "referer", "name": "referer", "searchable": true, "match": "partial"},
    {"key": "agent", "name": "agent", "searchable": true, "match": "partial"}
  ]
};


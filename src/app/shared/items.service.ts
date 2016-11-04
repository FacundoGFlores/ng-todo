import { Injectable} from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Item } from './item';

@Injectable()
export class ItemsService {
  items: Item[];

  constructor(private http: Http) {
  }

  getItems(uri) {
    return this.http.get(uri)
      .map((response) => response.json());
  }

  sendItem(item) {
    let body = JSON.stringify({ id: +item.id, title: item.title, description: item.description});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://api.myjson.com/bins', body, options)
      .map((response: Response) => response.json());
  }
}

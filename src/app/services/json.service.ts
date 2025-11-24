import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
  }
  private JsonUrl= 'assets/balance.json';
  
  private JsonUrlGit= 'https://diomarmajano.github.io/json-page/balance.json';

  constructor(private http: HttpClient) { }

  getJsonData():Observable<any>{
    return this.http.get(this.JsonUrlGit);
  }
}

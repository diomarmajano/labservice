import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  httpOptions ={
    Headers: new HttpHeaders({
      'Content-type': 'aplication/json'
    })
  }
  private JsonUrl= 'assets/servicios.json';
  private JsonUrlGit= 'https://diomarmajano.github.io/json-page/servicios.json';

  constructor(private http: HttpClient) { }

  getJsonData():Observable<any>{
    return this.http.get(this.JsonUrlGit);
  }
}

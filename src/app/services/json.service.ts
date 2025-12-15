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

  
  private JsonUrl= 'http://localhost:8082/resultados';

  constructor(private http: HttpClient) { }

  getJsonData():Observable<any>{
    return this.http.get(this.JsonUrl);
  }

}

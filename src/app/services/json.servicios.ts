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
  private JsonUrl= 'http://localhost:8083/users';

  constructor(private http: HttpClient) { }

  getJsonData():Observable<any>{
    return this.http.get(this.JsonUrl);
  }

   create(usuario: any): Observable<any> {
    return this.http.post(this.JsonUrl, usuario);
  }

  actualizarUsuario(usuario: any) {
  return this.http.put(`${this.JsonUrl}/${usuario.id}`, usuario);
}

eliminarUsuario(id: number) {
  return this.http.delete(`${this.JsonUrl}/${id}`);
}
}

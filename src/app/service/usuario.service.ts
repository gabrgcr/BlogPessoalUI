import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getByIdUser(id: number): Observable<user> {
    console.log(id)
    console.log(this.http.get<user>(`http://localhost:8080/usuarios/${id}`, this.token))
    return this.http.get<user>(`http://localhost:8080/usuarios/${id}`, this.token)
    ;
  }
}

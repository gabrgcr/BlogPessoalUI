import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../model/user';
import { userLogin } from '../model/userLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  entrar(userlog: userLogin): Observable<userLogin> {
    return this.http.post<userLogin>('http://localhost:8080/usuarios/logar', userlog)
  }

  cadastrar(User:user): Observable<user> {
    return this.http.post<user>('http://localhost:8080/usuarios/cadastrar', User)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllPostagens(): Observable<postagem[]> {
    return this.http.get<postagem[]>('http://localhost:8080/posts', this.token);
  }

  postPostagem(Postagem: postagem): Observable<postagem> {
    return this.http.post<postagem>('http://localhost:8080/posts/cadastrar', Postagem, this.token);
  }
}

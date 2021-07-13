import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { tema } from '../model/tema';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllTema(): Observable<tema[]> {
    return this.http.get<tema[]>('http://localhost:8080/tema/', this.token);
  }

  getTemaById(id:number):Observable<tema>
  {
    return this.http.get<tema>(`http://localhost:8080/tema/id/${id}/`, this.token);
  }

  getByNomeTema(nome: string):Observable<tema[]> {
    return this.http.get<tema[]>(
      `http://localhost:8080/tema/${nome}`,
      this.token
    );
  }

  postTema(Tema: tema): Observable<tema> {
    return this.http.post<tema>(
      'http://localhost:8080/tema/',
      Tema,
      this.token
    );
  }

  putTema(Tema: tema): Observable<tema> {
    return this.http.put<tema>('http://localhost:8080/tema/', Tema, this.token);
  }

  deleteTema(id: number) {
    return this.http.delete(`http://localhost:8080/tema/${id}/`, this.token);
  }
}

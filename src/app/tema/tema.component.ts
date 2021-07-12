import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { tema } from '../model/tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css'],
})
export class TemaComponent implements OnInit {
  Tema: tema = new tema();
  listaTemas: tema[];

  constructor(private router: Router, private temaService: TemaService) {}

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou. Faça login novamente');
      this.router.navigate(['/login']);
    }
    this.findAllTemas();
  }

  cadastrar() {
    this.temaService.postTema(this.Tema).subscribe((resp: tema) => {
      this.Tema = resp;
      alert('Tema criado com sucesso!');
      this.Tema = new tema();
      this.findAllTemas();
    });
    this.findAllTemas();
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: tema[]) => {
      this.listaTemas = resp;
    });
  }
}

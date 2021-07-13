import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { tema } from '../model/tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css'],
})
export class TemaComponent implements OnInit {
  Tema: tema = new tema();
  listaTemas: tema[];

  constructor(private router: Router, private temaService: TemaService, private alertas:AlertasService) {}

  ngOnInit() {
    if(environment.tipo != "adm"){
      this.alertas.showAlertDanger('Você precisa ser adm para acessar essa rota')
      this.router.navigate(['/inicio/'])
    }

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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';
import { tema } from '../model/tema';
import { user } from '../model/user';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  Tema: tema = new tema();
  listaTemas: tema[];
  idTema: number;
  Postagem: postagem = new postagem();
  usuario: user = new user();
  idUser = environment.id;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou. Faça login novamente');
      this.router.navigate(['/login']);
    }
    this.getAllTemas();
    this.idUser = environment.id;
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getTemaById(this.idTema).subscribe((resp: tema) => {
      this.Tema = resp;
    });
  }

  publicar() {
    this.idUser = environment.id;
    this.Tema.id = this.idTema;
    this.usuario.id = this.idUser;
    this.Postagem.tema = this.Tema;
    this.Postagem.usuario = this.usuario;

    this.postagemService
      .postPostagem(this.Postagem)
      .subscribe((resp: postagem) => {
        this.Postagem = resp;
        alert('Postagem criada com sucesso')
        this.Postagem = new postagem()
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';
import { tema } from '../model/tema';
import { user } from '../model/user';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  Tema: tema = new tema();
  listaTemas: tema[];
  listaPostagens: postagem[];
  idTema: number;
  Postagem: postagem = new postagem();
  usuario: user = new user();
  idUser = environment.id;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou. Faça login novamente');
      this.router.navigate(['/login']);
    }
    this.getAllTemas();
    this.getAllPostagens();
    this.idUser = environment.id;
    this.findByIdUser();
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: tema[]) => {
      this.listaTemas = resp;
    });
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  findByIdTema() {
    this.temaService.getTemaById(this.idTema).subscribe((resp: tema) => {
      this.Tema = resp;
    });
  }

  findByIdUser() {
    this.usuarioService.getByIdUser(this.idUser).subscribe((resp: user) => {
      this.usuario = resp;
    });
  }

  publicar() {
    this.getAllPostagens();
    this.idUser = environment.id;
    this.Tema.id = this.idTema;
    this.usuario.id = this.idUser;
    this.Postagem.tema = this.Tema;
    this.Postagem.usuario = this.usuario;

    this.postagemService
      .postPostagem(this.Postagem)
      .subscribe((resp: postagem) => {
        this.Postagem = resp;
        this.Postagem = new postagem();
        alert('Postagem criada com sucesso');
        this.getAllPostagens()
      });
    this.getAllTemas();
    this.getAllPostagens();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { postagem } from 'src/app/model/postagem';
import { tema } from 'src/app/model/tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css'],
})
export class PostagemEditComponent implements OnInit {
  Postagem: postagem = new postagem();
  Tema: tema = new tema();
  listaTemas: tema[];
  idTema: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) {}

  ngOnInit() {
    window.scroll(0,0)
    let id = this.route.snapshot.params['id'];
    this.getAllTemas();
    this.findByIdPostagem(id);
    this.idTema = this.Postagem.tema.id;
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: postagem) => {
      this.Postagem = resp;
    });
  }

  findByIdTema() {
    this.temaService.getTemaById(this.idTema).subscribe((resp: tema) => {
      this.Tema = resp;
    });
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: tema[]) => {
      this.listaTemas = resp;
    });
  }

  atualizar() {
    this.Tema.id = this.idTema;
    this.Postagem.tema = this.Tema;

    this.postagemService
      .putPostagem(this.Postagem)
      .subscribe((resp: postagem) => {
        this.Postagem = resp;
        alert('Postagem atualizada com sucesso!');
        this.router.navigate(['/inicio']);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { postagem } from 'src/app/model/postagem';
import { tema } from 'src/app/model/tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css'],
})
export class PostagemDeleteComponent implements OnInit {
  Postagem: postagem = new postagem();
  Tema: tema = new tema();
  listaTemas: tema[];
  idTema: number;
  idPost: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    let id = this.route.snapshot.params['id'];
    this.findByIdPostagem(id);
    this.idPost = id;
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: postagem) => {
      this.Postagem = resp;
    });
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: tema[]) => {
      this.listaTemas = resp;
    });
  }

  apagar() {
    this.postagemService
      .deletePostagem(this.idPost)
      .subscribe(() => {
        alert('Postagem deletada com sucesso!');
        this.router.navigate(['/inicio']);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tema } from 'src/app/model/tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css'],
})
export class TemaEditComponent implements OnInit {
  Tema: tema = new tema();

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }

    let id = this.route.snapshot.params['id'];
    this.findTemaById(id);
  }

  findTemaById(id: number) {
    this.temaService.getTemaById(id).subscribe((resp: tema) => {
      this.Tema = resp;
    });
  }

  atualizar() {
    this.temaService.putTema(this.Tema).subscribe((resp: tema) => {
      this.Tema = resp;
      alert('Tema Atualizado com sucesso!');
      this.router.navigate(['/tema']);
    });
  }
}

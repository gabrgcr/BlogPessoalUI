import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  User: user = new user();
  Senha: string;
  Tipo: string;
  idUser: number = environment.id;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    this.findByIdUser(this.idUser);
  }

  confirmSenha(event: any) {
    this.Senha = event.target.value;
  }

  tipoUser(event: any) {
    this.Tipo = event.target.value;
  }

  findByIdUser(id: number) {
    this.usuarioService.getByIdUser(id).subscribe((resp: user) => {
      this.User = resp;
    });
  }

  atualizar() {
    this.User.tipo = this.Tipo;
    if (this.User.senha != this.Senha) {
      alert('As senhas estão incorretas!');
    } else {
      this.auth.cadastrar(this.User).subscribe((resp: user) => {
        this.User = resp;
        console.log(resp);
        this.router.navigate(['/login']);
        alert('Usuário Cadastrado com Sucesso! Faça login novamente');
        environment.foto = '';
        environment.nome = '';
        environment.id = 0;
        environment.token = '';
        environment.senha = '';
      });
    }
  }
}

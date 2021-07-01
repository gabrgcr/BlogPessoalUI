import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../model/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  UserLogin: user = new user();
  Senha: string;
  Tipo: string;

  constructor(private auth: AuthService,
    private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmSenha(event: any) {
    this.Senha = event.target.value;
  }

  tipoUser(event: any) {
    this.Tipo = event.target.value;
  }

  cadastrar() {
    this.UserLogin.tipo = this.Tipo;
    if (this.UserLogin.senha != this.Senha) {
      alert('As senhas estão incorretas!');
    } else {
      this.auth.cadastrar(this.UserLogin).subscribe((resp: user) => {
        this.UserLogin = resp;
        this.router.navigate(['/login']);
        alert('Usuário Cadastrado com Sucesso!');
      });
    }
  }
}

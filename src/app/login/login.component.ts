import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { userLogin } from '../model/userLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: userLogin = new userLogin();
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  entrar() {
    this.auth.entrar(this.login).subscribe(
      (resp: userLogin) => {
        this.login = resp;

        environment.token = this.login.token;
        environment.foto = this.login.foto;
        environment.nome = this.login.nome;
        environment.id = this.login.id;
        environment.senha = this.login.senha;

        console.log(environment.foto);
        console.log(environment.token);
        console.log(environment.nome);
        console.log(environment.id);
        console.log(environment.senha);
        this.router.navigate(['/inicio']);
      },
      (erro) => {
        if (erro.status == 500) {
          alert('Usuário ou senha incorretos!');
        }
      }
    )
  }
}

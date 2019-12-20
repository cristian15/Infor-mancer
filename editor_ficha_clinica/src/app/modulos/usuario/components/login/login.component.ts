import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  login(formData){
    console.log("Iniciando Sesion", formData.recuerdame);

    let usuario: Usuario = {
      nombre: '',
      email: formData.email,
      password: formData.password,
      token2FA: '',
      Activo2FA: false,
      activo: true
    }

    this._usuarioService.login(usuario, formData.recuerdame ).then(() => this.router.navigate(['/']));


  }
  

}

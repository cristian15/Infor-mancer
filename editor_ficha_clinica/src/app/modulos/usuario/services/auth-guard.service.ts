import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  jwt = new JwtHelperService(); // Servicio para validar el token
  constructor( public _usuarioService: UsuarioService, public router: Router) { }

  canActivate(): boolean {
    if (this._usuarioService.estaLogueado() && !this.jwt.isTokenExpired(this._usuarioService.token)) {    // Chequea que el usuario tenga un token y que este no este caducado
      //console.log('Paso LoginGuard');
      return true;    
  }   
    console.log('Bloqueado por LoginGuard');
    this._usuarioService.logout();    // Redirecciona al login si no pasa la verificacion del token de usuario y no esta logueado.
    return false;
  
  }
}

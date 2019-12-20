import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor( public _usuarioService: UsuarioService, public router: Router) { }

  canActivate(): boolean {
    if (this._usuarioService.estaLogueado() && this._usuarioService.isAdmin()) {    // Chequea que el usuario este logueado y sea administrador
      //console.log('Paso LoginGuard');
      return true;    
  }   
    console.log('Bloqueado por Admin Guard');
    this.router.navigate['/'];
    return false;
  
  }
}

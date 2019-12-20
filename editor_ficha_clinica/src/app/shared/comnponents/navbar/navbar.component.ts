import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/modulos/usuario/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }
  
  logout(){
    this._usuarioService.logout();  // cierra la sesion con el metodo del servicio de Usuario
  }

}

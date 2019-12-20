import { Component } from '@angular/core';
import { UsuarioService } from './modulos/usuario/services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ficha-clinica';

  constructor(public _usuarioService: UsuarioService){

  }
}

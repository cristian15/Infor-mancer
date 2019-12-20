import { Injectable } from '@angular/core';
import { URL_FICHAS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../usuario/services/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class FichaService {
  
  constructor(public http: HttpClient,
    private _usuarioService: UsuarioService) {  }
  getFichaRut(rut){
    return this.http.get<any>(URL_FICHAS+`/rut/${rut}/${this._usuarioService.getToken()}`);
  }
  putModificarFicha(ficha){
    return this.http.put<any>(URL_FICHAS+`/${ficha._id}/${this._usuarioService.getToken()}`,ficha);
  }
  agregarPaciente(paciente){
    return this.http.post<any>(URL_FICHAS+`/paciente/${this._usuarioService.getToken()}`,paciente);
  }
  agregarFicha(ficha){
    return this.http.post<any>(URL_FICHAS+`/${this._usuarioService.getToken()}`,ficha);
  }
}

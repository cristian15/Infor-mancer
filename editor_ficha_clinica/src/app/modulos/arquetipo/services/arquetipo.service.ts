import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { URL_ARQUETIPO } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ArquetipoService {

  constructor(private http: HttpClient, private _usuarioService: UsuarioService) { }

  agregarArquetipo(arquetipo){
    return this.http.post<any>(URL_ARQUETIPO+`/${this._usuarioService.getToken()}` ,arquetipo);
  }
  getArquetipos(){
    return this.http.get<any>(URL_ARQUETIPO+`/${this._usuarioService.getToken()}`);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { URL_SERVICIOS, URL_USUARIOS } from 'src/app/config/config';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token = '';   // token devuelto por el Backen al momento de iniciar sesion
  usuario: Usuario;
  login_verificado: true;
  constructor( 
    private router: Router, // manejador de rutas
    public http: HttpClient,

    ) { 

      this.cargarStorage();
    }

    confirmarPassword(pass){
      return this.http.post(URL_USUARIOS+`/confirmar_password${this.getToken()}`, {password: pass});
    }

    async verificarLogin(respu){    // resuelve la autenticacion de 2 factores
      const { value: codigo } = await swal.fire({ // pide ingreso del codigo de la app de autenticacion
        title: 'Ingresa Código de Verificación',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      if (codigo) {   // si ya ingreso el codigo de la app de autenticacion
        this.verificar2FA({token2FA: respu.usuario.token2FA , codigo2FA: codigo}).subscribe(res=>{       
          if(!res.verificado)return swal.fire('Error', 'Código Incorrecto', 'error');   // Muestra mensaje de error en caso de que devuelva alguno desde el backend
              this.usuario = respu.usuario;   // guarda el objeto usuario devuelto del backend en el Servicio
              this.token = respu.token;     // guarda el token en el servicio
              localStorage.setItem('token', respu.token);   // carga el token al localStorage para no perderlo en caso de refrescar la web
              localStorage.setItem('usuario', JSON.stringify(respu.usuario)); // carga el objeto usuario devuelto del backend al localStorage para no perderlo en caso de refrescar la web
              this.router.navigate(['/']);     // Regresa a la ruta de login
            });
      }
    }

    login(usuario: Usuario, recuerdame: boolean = false): Promise<void> {   // metodo para iniciar sesion de usuario
      if (recuerdame) {
          localStorage.setItem('email', usuario.email);
      } else {
          localStorage.removeItem('email');
      }
      return new Promise((resolve => {
          return this.http.post(URL_SERVICIOS+'/login', usuario).subscribe((res: any) => {
            if(res.usuario.Activo2FA){    // si tiene la autenticacion de 2 factores habilitada pide el codigo de la app de autenticacion
              return this.verificarLogin(res);
            }
              this.usuario = res.usuario;   // guarda el objeto usuario devuelto del backen en el Servicio
              this.token = res.token; 
              localStorage.setItem('token', res.token);   // carga el token al localStorage para no perderlo en caso de refrescar la web
              localStorage.setItem('usuario', JSON.stringify(res.usuario)); // carga el objeto usuario devuelto del backend al localStorage para no perderlo en caso de refrescar la web
              resolve();    // ejecuta correctamente la Promesa
          }, (res: any) => {  // error de la promesa
              swal.fire('Error al ingresar', res.error.mensaje, 'error');   // Muestra mensaje de error en caso de que devuelva alguno desde el backend
          });
      }));
    }
    
  cargarStorage() {   // metodo que carga las variables desde el LocalStorage a las variables del Servicio
    this.token = localStorage.getItem('token') || '';   
    this.usuario = JSON.parse(localStorage.getItem('usuario')) || null;
  }
  guardarStorage() {
    localStorage.setItem('token', this.token);
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  logout(){   // metodo para cerrar sesion de usuario
    this.token = '';    // elimina el token del Servicio
    this.usuario = null;// elimina el objeto del servicio
    localStorage.removeItem('token');     // Remueve todas las variables del LocalStorage
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);     // Regresa a la ruta de login
  }
  estaLogueado(){  // Metodo que regresa True si tiene un token valido y False si es invalido
    return this.token.length > 20;      // comprueba que exita algun token en la variable
  }

  getToken(){
    return `?token=${this.token}`;
  }

  get2FAToken(){
    return this.http.get<any>(URL_SERVICIOS+`/login/2fa${this.getToken()}`);  
  }
  verificar2FA(verificar){
    return this.http.post<any>(URL_SERVICIOS+'/login/2fa', verificar); // devuelve true o false, de la verificacion del token con el codigo
  }

  actualizarUsuario() { 
    return this.http.put<any>(URL_USUARIOS + '/' + this.getToken(), this.usuario);    // devuelve del backend el objeto {usuario: usuarioModificado, toke: nuevoTokenGenerado}
  }
  updateUsuario(user) { 
    return this.http.put<any>(URL_USUARIOS + '/' + this.getToken(), user);    // devuelve del backend el objeto {usuario: usuarioModificado, toke: nuevoTokenGenerado}
  }
  
  actualizaPassword(pass){
    return this.http.post<any>(URL_USUARIOS+`/cambia_password${this.getToken()}`, {password:pass});
  }
  registrarUsuario(usuario){
    return this.http.post<any>(URL_USUARIOS+`/${this.getToken()}`, usuario);
  }
  getUsuarios(){
    return this.http.get<any>(URL_USUARIOS+`/${this.getToken()}`);
  }
  isAdmin(){
    return this.usuario.roles.includes('ADMIN');
  }
}

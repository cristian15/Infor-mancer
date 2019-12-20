import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-factor-config',
  templateUrl: './two-factor-config.component.html',
  styleUrls: ['./two-factor-config.component.css']
})
export class TwoFactorConfigComponent implements OnInit {

  password_confirmada = false;  // si pasa la confimacion de contraseña, true si la ingresada es correcta
  url2FA= '';
  token2FA = '';
  usuario;
  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ) {
     this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  confirmarPassword(form){
    this._usuarioService.confirmarPassword(form.password).subscribe(res=>{
      if(!res) return swal.fire('Error', 'Contraseña incorrecta!!', 'error');   // Muestra mensaje de error en caso de que devuelva alguno desde el backend
      this.password_confirmada = true;    // si la contraseña de usuario es la correcta
      this._usuarioService.get2FAToken().subscribe(res=>{   // obtiene eltoken generado desde el backend
        this.url2FA = res.url;    // obtiene el token de 2FA y la url del mismo para generar el codigo QR de este
        this.token2FA = res.token2FA;   // guarda el token 2FA para agregarlo al usuario y guardarlo en BD luego
      });
    });
  }
  confirmar2FA(form){
    this._usuarioService.verificar2FA({token2FA: this.token2FA, codigo2FA: form.codigo}).subscribe(res=>{
      if(!res.verificado)return swal.fire('Error', 'Código Incorrecto', 'error');   // Muestra mensaje de error en caso de que devuelva alguno desde el backend
      if(res.verificado){
        // Actualiza datos del usuario para luego cargarlo a la BD
        this._usuarioService.usuario.token2FA = this.token2FA;    
        this._usuarioService.usuario.Activo2FA = true;        

        this._usuarioService.actualizarUsuario().subscribe(res=>{       // actualiza datos en la bd   
          this._usuarioService.token = res.token;        // recibe el token nuevo con el usuario actualizado devuelto desde el backend
          this._usuarioService.usuario = res.usuario;    // actualiza el usuario del servicio con el recivido desde el servicio
          this._usuarioService.guardarStorage();        // actualiza datos en el LocalStorage
          this.usuario = res.usuario;                   // actualiza el usuario en el componente

          this.router.navigateByUrl('/perfil');
        });
      }
    });
  }

  desactivar2FA(form){
    this._usuarioService.verificar2FA({token2FA: this.token2FA, codigo2FA: form.codigo}).subscribe(res=>{
      if(res){
        // Actualiza datos del usuario para luego cargarlo a la BD
        this._usuarioService.usuario.token2FA = '';    
        this._usuarioService.usuario.Activo2FA = false;        

        this._usuarioService.actualizarUsuario().subscribe(resp=>{       // actualiza datos en la bd   
          this._usuarioService.token = resp.token;       // recibe el token nuevo con el usuario actualizado devuelto desde el backend
          this._usuarioService.usuario = resp.usuario;   // actualiza el usuario del servicio con el recivido desde el servicio
          this._usuarioService.guardarStorage();         // actualiza datos en el LocalStorage
          this.usuario = resp.usuario;                   // actualiza el usuario en el componente
          console.log(this.usuario);
          swal.fire('Actualizado correctamente');
          this.router.navigateByUrl('/perfil');
        });
      }
    });
  }

}

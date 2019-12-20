import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PRIVILEGIOS_USUARIO } from 'src/app/config/config';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {

  usuarios = [];
  privilegios_usuario = PRIVILEGIOS_USUARIO;
  privilegios_activos = [];
  usuario_activo;
  constructor(
    private _usuarioService: UsuarioService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this._usuarioService.getUsuarios().subscribe(res=>{
      this.usuarios = res.usuarios;
      this.usuarios.splice(this.usuarios.findIndex(u=>u._id==this._usuarioService.usuario._id),1);
      console.log(this.usuarios);
    });
  }
  activar2fa(user){
    console.log(user);
    user.token2FA = '';
    this._usuarioService.updateUsuario(user).subscribe(res=>{
      Swal.fire('Información', `Usuario <b>${user.email}</b> modificado correctamente`, 'success');
    });
  }
  activarUsuario(user){
    this._usuarioService.updateUsuario(user).subscribe(res=>{
      Swal.fire('Información', `Usuario <b>${user.email}</b> modificado correctamente`, 'success');
    });
  }

  openDialog(content, user){
    this.privilegios_activos = [];
    this.usuario_activo = user;
    for(let p of this.privilegios_usuario){
      this.privilegios_activos.push({privilegio: p, activo: user.roles.includes(p) })
    }
    this.modalService.open(content);
  }
  actualizaPrivilegios(c){
    this.usuario_activo.roles = [];
    for(let p of this.privilegios_activos){
      if(p.activo) this.usuario_activo.roles.push(p.privilegio)
    }
    console.log(this.usuario_activo);
    this._usuarioService.updateUsuario(this.usuario_activo).subscribe(res=>{
      if(res.ok){
        Swal.fire("Exito",`Privilegios de <b>${res.usuario.email}</b> Actualizados Correctamente!!`);
        c.close()
      }
    });
  }
}

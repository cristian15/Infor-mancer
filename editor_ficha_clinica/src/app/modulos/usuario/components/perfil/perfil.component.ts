import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/validators/must-match.validator';
import swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  passwordForm: FormGroup;
  constructor(
    private _usuarioService: UsuarioService,
    private formBuilder: FormBuilder
  ) {
      this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {

    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      password_nueva: ['', [Validators.required, Validators.minLength(6)]],
      password_confirma: ['', Validators.required]
    },{
      validators: MustMatch('password_nueva', 'password_confirma')
    });
  }

  cambiaPassword(){
    if(!this.passwordForm.invalid){
      this._usuarioService.confirmarPassword(this.passwordForm.value.password).subscribe(res=>{
        if(!res) return swal.fire('Error', 'Contraseña Incorrecta!!','error');

        this._usuarioService.actualizaPassword(this.passwordForm.value.password_nueva).subscribe(res=>{
          if(res.ok){
            this.passwordForm.reset();
            return swal.fire('Contraseña', 'Contraseña actualizada correctamente','success');
          }
        });
       
      });
    }
  }

  guardarDatos(){
    this._usuarioService.actualizarUsuario().subscribe(res=>{
      if(!res.ok) return swal.fire('Error', res.mensaje,'error');
      swal.fire('Confirmación', 'Datos Actualizados correctamente!!','success');
      this.usuario = res.usuario;
      this._usuarioService.usuario = res.usuario;
      this._usuarioService.guardarStorage();
    });
  }

}

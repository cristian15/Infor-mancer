import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/validators/must-match.validator';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  constructor(
    private _usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: [''],
      email: ['', [Validators.email,Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirma: ['']
    },{
      validators: MustMatch('password', 'password_confirma')    // Validador q confirma que dos campos sean iguales
    });
  }

  registrar(){
    let newUsuario: Usuario ={    // crea el nuevo objeto Usuario con los datos capturados desde el Formulario
      nombre: `${this.registroForm.value.nombre} ${this.registroForm.value.apellido}`,
      email: this.registroForm.value.email,
      password: this.registroForm.value.password,
      roles: ['USUARIO']
    }

    this._usuarioService.registrarUsuario(newUsuario).subscribe(res=>{    // envia el nuevo usuario al backend
      if(!res.ok) return swal.fire('Error', res.errors.message,'error');   // muestra mensaje si recibe algun error
      swal.fire('Usuario creado con exito',`Bienvenido ${res.usuario.email}`,'success' ); // mensaje de confirmacion de usuario creado correctamente
      this.router.navigateByUrl('/'); // vuelve a la ruta principal
    });
  }

}

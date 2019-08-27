import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RecuperaPassComponent } from './components/recupera-pass/recupera-pass.component';
import { RegistroComponent } from './components/registro/registro.component';
import { USER_ROUTES } from './usuario.routes';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { TwoFactorConfigComponent } from './components/two-factor-config/two-factor-config.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    LoginComponent,   
    PerfilComponent,
    RecuperaPassComponent,
    RegistroComponent,
    TwoFactorConfigComponent
  ],
  imports: [
    CommonModule,
    USER_ROUTES,      // rutas del modulo
    HttpClientModule,
    FormsModule, 
    NgxQRCodeModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }

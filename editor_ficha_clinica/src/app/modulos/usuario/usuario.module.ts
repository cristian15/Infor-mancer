import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RecuperaPassComponent } from './components/recupera-pass/recupera-pass.component';
import { RegistroComponent } from './components/registro/registro.component';
import { USER_ROUTES } from './usuario.routes';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { TwoFactorConfigComponent } from './components/two-factor-config/two-factor-config.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Verificar2FAComponent } from './components/verificar2-fa/verificar2-fa.component';
import { UsuariosAdminComponent } from './components/usuarios-admin/usuarios-admin.component';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoginComponent,   
    PerfilComponent,
    RecuperaPassComponent,
    RegistroComponent,
    TwoFactorConfigComponent,
    Verificar2FAComponent,
    UsuariosAdminComponent
  ],
  imports: [
    CommonModule,
    USER_ROUTES,      // rutas del modulo
    HttpClientModule,
    FormsModule, 
    NgxQRCodeModule,
    ReactiveFormsModule,
    
    /* == Angular Material == */
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    /* ================== */
    NgbModule
  ],
  providers: [
    UsuarioService,
    FormBuilder
  ]
})
export class UsuarioModule { }

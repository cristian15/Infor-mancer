import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/comnponents/navbar/navbar.component';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { appRoutingModule } from './app.routes';
import { InicioComponent } from './inicio/inicio.component';
import { EditorFichaModule } from './modulos/editor-ficha/editor-ficha.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ArquetipoModule } from './modulos/arquetipo/arquetipo.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    UsuarioModule,
    EditorFichaModule,
    ArquetipoModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

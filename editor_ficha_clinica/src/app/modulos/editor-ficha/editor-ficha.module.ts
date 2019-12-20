import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaComponent } from './components/ficha/ficha.component';
import { FichaService } from './services/ficha.service';
import { EDITOR_FICHA_ROUTES } from './editor-ficha.routes';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EditorArquetiposComponent } from './components/editor-arquetipos/editor-arquetipos.component';
import { DatosPacienteComponent } from './components/datos-paciente/datos-paciente.component';
import { PestanasArquetipoComponent } from './components/pestanas-arquetipo/pestanas-arquetipo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AgregarPacienteComponent } from './components/agregar-paciente/agregar-paciente.component';
import { ArquetipoModule } from '../arquetipo/arquetipo.module';



@NgModule({
  declarations: [FichaComponent, EditorArquetiposComponent, DatosPacienteComponent, PestanasArquetipoComponent, AgregarPacienteComponent],
  imports: [
    CommonModule,
    EDITOR_FICHA_ROUTES,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    ArquetipoModule
  ], 
  providers: [FichaService,
  FormBuilder]
})
export class EditorFichaModule { }

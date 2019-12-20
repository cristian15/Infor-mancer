import { Component, OnInit } from '@angular/core';
import { FichaService } from '../../services/ficha.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../../models/paciente.model';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent implements OnInit {
  pacienteForm: FormGroup;

  constructor(private _fichaService: FichaService,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.pacienteForm = this.formBuilder.group({
      nombre: ['',Validators.required],
      rut: ['',Validators.required],
      direccion: [''],
      fecha_nacimiento: [new Date(), Validators.required],
      prevision: ['Fonasa', Validators.required],
      estatura_paciente: ['1',Validators.required],
      grupo_sangre: ['A', Validators.required],
      rh: ['+', Validators.required],
      fono: ['',Validators.required],
      genero: ['Masculino'],
    });
  }

  agregarPaciente(){
    let newPaciente: Paciente = {
      nombre:                 this.pacienteForm.value.nombre,
      rut:                    this.pacienteForm.value.rut,
      genero:                 this.pacienteForm.value.genero,
      direccion:              this.pacienteForm.value.direccion,
      fecha_nacimiento:       this.pacienteForm.value.fecha_nacimiento,
      prevision:              this.pacienteForm.value.prevision,
      estatura_paciente:      this.pacienteForm.value.estatura_paciente,
      grupo_sangre:           this.pacienteForm.value.grupo_sangre,
      rh:                     this.pacienteForm.value.rh,
      fono:                   this.pacienteForm.value.fono
    };
    this._fichaService.agregarPaciente(newPaciente).subscribe(res=>{
      if(!res.ok) return Swal.fire('Error', res.err.message,'error');
      let newFicha = {folio: 0, paciente: res.paciente._id, fecha_ingreso: new Date(), arquetipos: []};
      this._fichaService.agregarFicha(newFicha).subscribe(resp=>{
          console.log(resp);
      });
      Swal.fire('Todo Bien', `Paciente <b>${res.paciente.rut}</b> Creado Correctamente`);
    });
  }

  
}


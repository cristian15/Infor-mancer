import { Component, OnInit } from '@angular/core';
import { FichaService } from '../../services/ficha.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})

export class FichaComponent implements OnInit {

  ficha: any;
  rut = '';
  agregar_arquetipo = false;
  
  constructor(
    private _fichaService: FichaService,
    private router: Router
    ) { }

  ngOnInit() {
   
  }   
   
  buscarFicha(){
    if(this.rut.length==0) return Swal.fire("Error", "Ingrese Rut a buscar","error");
     this._fichaService.getFichaRut(this.rut).subscribe(f=>{
       if (!f) (async () => {
        const { value: confirm} = await Swal.fire({
          title: 'Paciente no encontrado',
            type: 'warning',
            text: '¿desea crear paciente?',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:'<i class="fa fa-thumbs-up"></i> SI',
            confirmButtonAriaLabel: 'si',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> NO',
            cancelButtonAriaLabel: 'no'
        })
        if (confirm) {
          this.router.navigateByUrl('/paciente');
        }
      })()
      this.ficha = f;
      this.agregar_arquetipo=true;
    });
  }

  formatea(e){
    this.rut = this.format(this.rut);
  }
  clean (rut) {       // limpia de puntos y guion el rut ingresado
    return typeof rut === 'string'
      ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
      : ''
  }
  format (rut) {    // formatea el rut  con puntos y guion
    if(rut.length<=1) return rut
    rut = this.clean(rut);
    var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
    for (var i = 4; i < rut.length; i += 3) {
      result = rut.slice(-3 - i, -i) + '.' + result;
    }
    return result;
  }

  recibeArquetipo(a){
    this.ficha.arquetipos.push(a);    // agrega el arquetipo a la ficha
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css']
})
export class DatosPacienteComponent implements OnInit {

  @Input() ficha:any;
  constructor() { }

  ngOnInit() {
  }

}

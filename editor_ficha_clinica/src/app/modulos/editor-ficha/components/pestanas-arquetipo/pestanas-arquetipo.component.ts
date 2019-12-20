import { Component, OnInit,Input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-pestanas-arquetipo',
  templateUrl: './pestanas-arquetipo.component.html',
  styleUrls: ['./pestanas-arquetipo.component.css']
})
export class PestanasArquetipoComponent implements OnInit {

  @Input() ficha:any;
  _fichaService: any;
  constructor() { }

  ngOnInit() {

    console.log("FICAHA::", this.ficha);
  }

}

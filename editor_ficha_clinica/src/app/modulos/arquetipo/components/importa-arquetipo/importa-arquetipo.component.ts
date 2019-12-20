import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArquetipoService } from '../../services/arquetipo.service';
import { Arquetipo } from '../../models/arquetipo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-importa-arquetipo',
  templateUrl: './importa-arquetipo.component.html',
  styleUrls: ['./importa-arquetipo.component.css']
})
export class ImportaArquetipoComponent implements OnInit {

  @Output() addArquetipo = new EventEmitter();

  archivo;
  xml;
  arquetipo: Arquetipo = new Arquetipo();  
  nombre = '';
  
  constructor(private _arquetipoService: ArquetipoService) { }

  ngOnInit() {
  }


  sube(f){
    this.arquetipo.campos = [];
    this.archivo = f.target.files[0];
    var reader = new FileReader();
    //console.log("Archivo::", this.archivo);
    reader.onloadend = (e)=>{
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(reader.result.toString(),"text/xml");
      /* console.log("ARCHIVO::", reader.result);
      console.log("ARCHIVO::", this.xmlToJson(xmlDoc)); */
      if(this.archivo.type=='text/xml'){
        this.xml = this.xmlToJson(xmlDoc);
        console.log(this.xml);
        for(let a of this.xml['archetype']['ontology']['term_definitions'][0].items){
          this.arquetipo.campos.push({ 
                                        nombre:       a.items[0]['#text'],
                                        descripcion:  a.items[1]['#text'],
                                        valor:  ''
                                    });
        }
      }
      var cortado = reader.result.toString().split('\n');
      var cort =[];
      var incluye = false;
      for(let i in cortado){
        if(incluye){
          cort.push(cortado[i]);
          //console.log("TEXTO:::",cortado[i].substring(cortado[i].lastIndexOf('<')+1, cortado[i].lastIndexOf('>')));
        }
        if(cortado[i].includes('ontology')){          
          //console.log(cortado[i]);
          incluye = true;
        }
      }
      //console.log(cort);
      //console.log("CORTADO::::", cortado);
      //console.log("LEIDO::::", reader.result);
    };
    reader.readAsText(this.archivo);
  }

  subir(){
    if( !this.arquetipo.nombre ||this.arquetipo.nombre.length==0){
      return Swal.fire('Error','El Arquetipo debe contener un nombre','error');
    }
    this._arquetipoService.agregarArquetipo(this.arquetipo).subscribe(res=>{
      console.log(res);
      if(res.ok){
        this.arquetipo = new Arquetipo();
        this.addArquetipo.emit(res.arquetipo);
        return Swal.fire("Exito", `Arquetipo <b> ${res.arquetipo.nombre}</b> agregado Correctamente`, 'success');
      }
      return Swal.fire('Error', res.err,'error');
    })
  }

  xmlToJson(xml) {
	
    // Create the return object
    var obj = {};
  
    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }
  
    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  };
}

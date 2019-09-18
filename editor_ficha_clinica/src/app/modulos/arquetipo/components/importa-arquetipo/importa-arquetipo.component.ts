import { Component, OnInit } from '@angular/core';
import { ArquetipoService } from '../../services/arquetipo.service';
import { Arquetipo } from '../../models/arquetipo.model';

@Component({
  selector: 'app-importa-arquetipo',
  templateUrl: './importa-arquetipo.component.html',
  styleUrls: ['./importa-arquetipo.component.css']
})
export class ImportaArquetipoComponent implements OnInit {

  archivo;
  xml;
  arquetipo: Arquetipo = new Arquetipo();  
  
  constructor(private _arquetipoService: ArquetipoService) { }

  ngOnInit() {
  }


  sube(f){
    this.arquetipo.campos = [];
    this.archivo = f.target.files[0];
    var reader = new FileReader();
    console.log("Archivo::", this.archivo);
    reader.onloadend = (e)=>{
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(reader.result.toString(),"text/xml");
      /* console.log("ARCHIVO::", reader.result);
      console.log("ARCHIVO::", this.xmlToJson(xmlDoc)); */
      if(this.archivo.type=='text/xml'){
        this.xml = this.xmlToJson(xmlDoc);
        for(let a of this.xml['archetype']['ontology']['term_definitions'][0].items){
          this.arquetipo.campos.push({ 
                                        nombre:       a.items[0]['#text'],
                                        descripcion:  a.items[1]['#text'],
                                        valor:  ''
                                    });
        }
            
      }
      console.log("LEIDO::::", reader.result);
    };
    reader.readAsText(this.archivo);
  }

  subir(){
    this._arquetipoService.agregarArquetipo(this.arquetipo).subscribe(res=>{
      console.log(res);
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
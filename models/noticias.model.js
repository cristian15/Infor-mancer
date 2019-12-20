const mongoose=require('mongoose');
const Schema=mongoose.Schema;



//Opcion de Conteo de Visitas 


const noticiaSchema=new Schema({
    titulo:{type:String},
    resumen:{type:String},
    cuerpo:{type:String},
    imagen:{type:String},

})

module.exports= mongoose.model('noticia',noticiaSchema);
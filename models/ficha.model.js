const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Datos Fijos 

const arquetipoSchema = new Schema({
    nombre: {type:String},
    valor: {type:String},
    descripcion: {type:String}
})

const arquetiposSchema = new Schema({
    usuario:        {type: mongoose.Schema.Types.ObjectId, ref: 'usuario'},
    fecha_atencion: {type:Date},
    nombre:         {type:String},
    campos:         [arquetipoSchema]
})

const fichaSchema = new Schema({
    folio: { type: Number, required: [true, "Numero de ingrso del paciente"] },
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente'},
    fecha_ingreso: { type: Date, requiered: [true, "Primer Ingreso del Paciente "] },
    arquetipos: [ arquetiposSchema]

});
module.exports = mongoose.model('ficha', fichaSchema);

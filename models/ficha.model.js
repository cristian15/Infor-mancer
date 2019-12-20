const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Datos Fijos 

const campoSchema = new Schema({
    nombre: {type:String},
    valor: {type:String},
    descripcion: {type:String}
})

const arquetiposSchema = new Schema({
    usuario:        {type: mongoose.Schema.Types.ObjectId, ref: 'usuario'},
    fecha_atencion: {type:Date},
    nombre:         {type:String},
    campos:         [campoSchema],
    editable:       {type:Boolean, default: true}
})

const fichaSchema = new Schema({
    folio: { type: Number, required: [true, "Numero de ingrso del paciente"] },
    paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente'},
    fecha_ingreso: { type: Date, requiered: [true, "Primer Ingreso del Paciente "] },
    arquetipos: [ arquetiposSchema],
    last_update: {type: Date}
});
module.exports = mongoose.model('ficha', fichaSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const pacienteSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre del paciente debe ser completo"] },
    rut: { type: String, unique: true, required: [true, "Sin digito verificador"] },
    fecha_nacimiento: { type: String, default: 0 },
    genero: { type: String},
    direccion: { type: String, required: [true, "Direccion actual del Paciente"] },
    prevision: { type: String, required: [true, "Fonasa o Isapre"] },
    grupo_sangre: { type: String, required: [true, "Tipo de sangre"] },
    rh: { type: String, required: [true] },
    estatura_paciente: { type: Number, default: 1 },
    fono: { type: String, required: [true, "Telefono o celular"] }
});

pacienteSchema.plugin(uniqueValidator, { message: 'El {PATH} tiene que ser unico' });

module.exports = mongoose.model('Paciente', pacienteSchema); //Exportar el Modulo
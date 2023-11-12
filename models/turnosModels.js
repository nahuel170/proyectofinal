const mongoose = require('mongoose');
const { Schema } = require ('mongoose');

const TurnosSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    telefono: {type: Number, required: true},
    email: {type: String, required: true},
    fecha: {type: String, required: true},
    hora: {type: String, required: true},
    servicio: {type: String, required: true},
    imagen: {type: String, required: true},
   
    //  hora: { type: Schema.Types.ObjectId, ref: 'Hora' },
    enabled: Boolean,
    created: Date,
    updated: Date
});

module.exports = mongoose.model('Turnos',TurnosSchema)
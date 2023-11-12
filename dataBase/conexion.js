const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const urlAtlas = 'mongodb+srv://nahuelraspo20:Tumami12@cluster0.qqxfqj8.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';


const conexion= mongoose.connect(urlAtlas).then(() => {

    console.log('Conectado a la base de datos');
},
    err => {
        console.log('Error al conectar a la base de datos', err);
    

} );

module.exports = conexion;
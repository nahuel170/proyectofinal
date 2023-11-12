const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const PORT = 3000;
const conexion = require('./dataBase/conexion');

//Levantamos el servidor
const server = app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});

server.on('error', (err) => {
    console.log(`Server error: ${err}`);
});
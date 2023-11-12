const {Router} = require('express');
const router = Router();
const Turnos = require('../models/turnosModels');
const {
    mostrarTurnos,
    createTurnos,
    listarTurnos,
    mostrar,
    eliminar,
    actualizar,
    actualizado
}= require('../controllers/turnosControllers');

router.get('/', mostrarTurnos);

router.get('/listar', listarTurnos);

router.get('/mostrar/:_id', mostrar);

router.post('/eliminar/:_id',eliminar);

router.post('/actualizar/:_id',actualizar);

router.post('/actualizarturno/:_id',actualizado);

router.post('/', createTurnos);

module.exports = router;
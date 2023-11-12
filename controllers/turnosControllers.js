const { validationResult } = require('express-validator');
const Turnos = require('../models/turnosModels');
const mostrarTurnos = (req, res) => {
  res.render('turnos')
};
const listarTurnos = async (req, res) => {
  try {

    const verTurno = await Turnos.find({});

    console.log(verTurno);

    return res.render('verturno', {
      turnos: verTurno
    });

  } catch (error) {
    console.log(error);
    res.render('error');
  }
};
const mostrar = async (req, res) => {
  const id = req.params._id;

  console.log(id);

  try {

    const turnoBuscado = await Turnos.findById(id);

    console.log(turnoBuscado);

    return res.render('detalturno', {
      id,
      turnoBuscado
    })

  } catch (error) {
    console.log(error);
  }
};
const eliminar = async (req, res) => {

  const id = req.params._id;

  console.log(id);

  try {

    const turnoEliminado = await Turnos.findByIdAndDelete(id);

    console.log(turnoEliminado);

    return res.render('eliminar', {
      turnoEliminado
    })

  } catch (error) {
    console.log(error);
  }
};

const actualizar = async (req, res) => {

  const id = req.params._id;

  console.log(id);

  try {

    const turnoParaActualizar = await Turnos.findById(id);

    console.log(turnoParaActualizar);

    return res.render('actualizarturno', {
      turnoParaActualizar,
      id
    })

  } catch (error) {
    console.log(error);
  }
};

const actualizado = async (req, res) => {

  const id = req.params._id;

  console.log(`el id para actualizar es: ${id}`);

  try {

    const dato = req.body

    console.log(dato);

    const turno = await Turnos.findById(id);

    console.log(turno);

    const actualizar = await Turnos.findByIdAndUpdate(id, dato, { new: true });

    console.log(actualizar)

    return res.render('actualizado', {
      actualizar
    });

  } catch (error) {
    console.log(error);
    res.render('error')
  }
};

const createTurnos = async (req, res) => {
  const data = req.body;
  try {
    const turno_data = {
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      email: data.email,
      fecha: data.fecha,
      hora: data.hora,
      servicio: data.servicio,
      imagen: data.imagen,
      enabled: true
    };
    console.log(turno_data);
    const turno = await new Turnos(turno_data);
    let turnoGuardado = await turno.save();

    return res.status(200).json({ data: 'turno creado exitosamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};
module.exports = {
  mostrarTurnos,
  listarTurnos,
  createTurnos,
  mostrar,
  eliminar,
  actualizar,
  actualizado
};
const { response } = require('express')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const Evento = require('../models/Evento')
const { generarJWT } = require('../helpers/jwt')

const getEventos = async (req, res) => {
  const eventos = await Evento.find().populate('user', 'name')
  res.json({
    ok: true,
    eventos
  })
}
const crearEventos = async (req, res) => {
  const evento = new Evento(req.body)

  try {
    evento.user = req.id
    const eventoGuardado = await evento.save()
    res.json({
      ok: true,
      evento: eventoGuardado
    })
  } catch (error) {
    console.log(error)
    res.json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const actualizarEventos = async (req, res) => {
  const eventoId = req.params.id
  const uid = req.id
  try {
    const evento = await Evento.findById(eventoId)
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no encontrado'
      })
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tienes permisos para editar este evento'
      })
    }
    const nuevoEvento = {
      ...req.body,
      user: uid
    }
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    )
    res.json({
      ok: true,
      evento: eventoActualizado
    })
  } catch (error) {
    console.log(error)
    res.json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}
const eliminarEventos = async (req, res) => {
  const eventoId = req.params.id
  const uid = req.id
  try {
    const evento = await Evento.findById(eventoId)
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no encontrado'
      })
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tienes permisos para eliminar este evento'
      })
    }

    await Evento.findByIdAndDelete(eventoId)
    res.json({
      ok: true
    })
  } catch (error) {
    console.log(error)
    res.json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}
module.exports = {
  getEventos,
  crearEventos,
  actualizarEventos,
  eliminarEventos
}

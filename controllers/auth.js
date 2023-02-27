const { response } = require('express')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body
  try {
    let usuario = await Usuario.findOne({ email })
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists with this email address'
      })
    }
    usuario = new Usuario(req.body)
    //encript password
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)
    await usuario.save()
    //JWT token
    const token = await generarJWT(usuario.id, usuario.name)

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please talk to administrator'
    })
  }
}
const loginUsuario = async (req, res) => {
  const { email, password } = req.body
  try {
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'You do not have permission to access this'
      })
    }
    //confirm the password
    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Wrong password'
      })
    }

    const token = await generarJWT(usuario.id, usuario.name)
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please talk to administrator'
    })
  }
}
const revalidarToken = async (req, res) => {
  const uid = req.id
  const name = req.name
  //generar un nuevo token
    const token = await generarJWT(uid, name)
  res.json({
    ok: true,
    token
  })
}
module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}

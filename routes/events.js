const { Router } = require('express')
const { check } = require('express-validator')
const {
  getEventos,
  crearEventos,
  actualizarEventos,
  eliminarEventos
} = require('../controllers/events')
const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()
router.use(validarJWT)
//obtener los eventos
router.get('/', getEventos)
//crear nuevos eventos
router.post(
  '/',
  [
    check('title', 'El Titulo es obligatoorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
   validarCampos],
  crearEventos
)
//actualiza los eventos
router.put('/:id', actualizarEventos)
//borrar eventos
router.delete('/:id', eliminarEventos)

module.exports = router

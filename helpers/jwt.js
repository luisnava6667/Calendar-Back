const jwt = require('jsonwebtoken')

const generarJWT = (id, name) => {
  return jwt.sign({ name, id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}
module.exports = {
  generarJWT
}

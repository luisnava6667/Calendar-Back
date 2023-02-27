const jwt = require('jsonwebtoken')
const validarJWT = (req, res, next) => {
  //token en los headers
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token found permitted'
    })
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    req.id = payload.id
    req.name = payload.name
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'No token found'
    })
  }
  next()
}
module.exports = { validarJWT }

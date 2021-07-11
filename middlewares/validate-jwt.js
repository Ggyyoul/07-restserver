const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req = request, res = responsespose, next) => {
  const token = req.header('x-token');
  if(!token) {
    return res.status(401).json({
      msg: "No hay token en la petición"
    })
  }

  try {
    const payload = jwt.verify(token, process.env.SECRETORPUBLICKEY);
    const { uid } = payload;

    req.uid = uid

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: "token no valido"
    })
  }
}

module.exports = {
  validateJWT
}
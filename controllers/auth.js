const { response } = require('express');
const bcryptjs = require('bcryptjs')
const User  =  require('../models/user')


const login = async  (req, res = response) => {

  const { email, password } = req.body;
  try {

    //verificar si el email exist
    const user = await User.findOne({email})
    if(!user) {
      return res.status(400).json({
        msg: "User / Password no son correctos - email"
      })
    }
    //verificar si el usuario esta activo
    if(!user.state) {
      return res.status(400).json({
        msg: "El usuario no se encuentra activo"
      })
    }

    //verificar contraseña
    const validPassword = bcryptjs.compareSync(password, user.password)
    if(!validPassword){
      return res.status(400).json({
        msg: "User / Password no son correctos - password"
      })
    }
    //generar el JWT

    res.json({
      msg: 'login ok',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Talk with administrator',
    });
  }
};

module.exports = {
  login,
};

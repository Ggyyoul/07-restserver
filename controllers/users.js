const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = (req, res = response) => {
  // http://localhost:8080/api/users?q=hola&apiKey=1664684
  const { q, name = 'No name', apiKey } = req.query;
  res.json({
    msg: 'get API - controller',
    q,
    name,
    apiKey,
  });
};

const usersPut = async (req, res = response) => {
  const id = req.params.id;
  const { password, google,email,  ...rest } = req.body;

  // TODO: Validar con la base de datos

  if (password) {
    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest)

  res.json({
    msg: 'Put Api - controller',
    user,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Encryp password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  //save in DB
  await user.save();

  res.status(201).json({
    user,
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: 'Delete Api',
  });
};
module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
};

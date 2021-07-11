const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async (req, res = response) => {
  const { limit = 5, from = 1 } = req.query;

  // const allUsers = await User.countDocuments({ state: true });
  // const users = await User.find({ state: true })
  //el skips es para determinar desde que registro quiero traer
  // .skip(Number(from))
  // el limit es para terminar cuando registros me quiero traer
  // .limit(Number(limit));

  // const resp = await Promise.all([
  //   User.countDocuments({ state: true }),
  //   User.find({ state: true }).skip(Number(from)).limit(Number(limit)),
  // ]);

  const [totalUsers, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).skip(Number(from)).limit(Number(limit)),
  ]);


  res.json({
    totalUsers,
    users
  });
};

const usersPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...rest } = req.body;

  // TODO: Validar con la base de datos

  if (password) {
    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
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

const usersDelete = async (req, res = response) => {

  const { id } = req.params;

  // borrar fisicamente
  // mala forma porque podemos perfer la referencia hacia el resto de datos
  // const user = await User.findByIdAndDelete(id)

  // ELIMINAR PERO CAMBIANDO EL ESTADO DEL REGISTRO A FALSO
  const user = await User.findByIdAndUpdate(id, {state: false})

  res.json({
    user

  });
};
module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
};

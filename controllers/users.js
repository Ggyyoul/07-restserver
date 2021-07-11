const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async (req, res = response) => {
  const { limit, from } = req.query;

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

  //Este lo traigo desde el validate-jwt.js
  const uid = req.uid;

  const user = await User.findByIdAndUpdate(id, {state: false})

  res.json({
    user,
    uid

  });
};
module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
};

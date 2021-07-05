const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
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

const usersPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: 'Put Api - controller',
    id,
  });
};

const usersPost = async (req, res = response) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(errors)
  }


  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // confirm if email exist
  const existEmail = await User.findOne({ email });
  console.log(existEmail);
  if (existEmail) {
    return res.status(400).json({
      msg: 'El correo ya está registrado',
    });
  }
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

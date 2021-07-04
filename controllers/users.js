const { response, request } = require('express');

const usersGet = (req, res = response) => {
  res.json({
    msg: 'get API - controller',
  });
};

const usersPut = (req, res = response) => {
  res.json({
    msg: 'Put Api - controller',
  });
};

const usersPost = (req, res = response) => {

  const {name, age} = req.body;
  res.status(201).json({
    msg: 'Post Api - controller',
    name,
    age
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
  usersDelete
};

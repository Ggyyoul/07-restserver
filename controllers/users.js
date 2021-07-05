const { response, request } = require('express');

const usersGet = (req, res = response) => {
  // http://localhost:8080/api/users?q=hola&apiKey=1664684
  const {q, name = 'No name', apiKey} = req.query;

  res.json({
    msg: 'get API - controller',
    q,
    name,
    apiKey

  });
};

const usersPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: 'Put Api - controller',
    id,
  });
};

const usersPost = (req, res = response) => {
  const { name, age } = req.body;
  res.status(201).json({
    msg: 'Post Api - controller',
    name,
    age,
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

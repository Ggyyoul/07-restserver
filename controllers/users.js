const { response } = require('express');

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
  res.status(201).json({
    msg: 'Post Api - controller',
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

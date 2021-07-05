const {Schema, model} = require('mongoose')

const userSchema = Schema({
  name: {
    type: String,
    require: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    require: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'El password es obligatorio']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    require: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false

  }

});


module.exports = model( 'User', userSchema)
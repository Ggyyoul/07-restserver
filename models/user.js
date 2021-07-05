const {Schema, model} = require('mongoose')

const userSchema = Schema({
  name: {
    type: String,
    required:[true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
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

//Metodo para retornar en la respuesta solo los valores que yo quiera
userSchema.methods.toJSON = function() {
  const  {__v, password, ...user } = this.toObject();
  return user;
}

module.exports = model( 'User', userSchema)
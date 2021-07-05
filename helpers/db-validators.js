const Role = require('../models/role');
const User = require('../models/user')

const isRoleValid = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El rol ${role} no esta registrado en la BD`);
  }
}

const emailAvailable = async (email) => {
  const emailExist = await User.findOne({email});
  if(emailExist) {
    throw new Error(`El correo ya se encuentra registrado ` )
  }
}

const existUserById = async (id) => {
  const userExist = await User.findById(id)
  if(!userExist) {
    throw new Error(`El ${id} no existe`)
  }
}

module.exports = {
  isRoleValid,
  emailAvailable,
  existUserById
}
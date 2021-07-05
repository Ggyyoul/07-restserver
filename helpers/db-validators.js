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

// const existEmail = await User.findOne({ email });
// console.log(existEmail);
// if (existEmail) {
//   return res.status(400).json({
//     msg: 'El correo ya está registrado',
//   });
// }

module.exports = {
  isRoleValid,
  emailAvailable
}
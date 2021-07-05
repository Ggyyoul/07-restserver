const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} = require('../controllers/users');
const { isRoleValid, emailAvailable, existUserById } = require('../helpers/db-validators');


const router = Router();

router.get('/', usersGet);

router.put('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existUserById),
  check('role').custom(isRoleValid),
  validateFields
], usersPut);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check(
      'password',
      'El password es obligatorio y tener mas de 6 letras'
    ).isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailAvailable),
    //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    //La linea de arriba es lo mismo que la que esta abajo
    //check('role').custom(role => isRoleValid(role)),

    validateFields,
  ],
  usersPost
);

router.delete('/', usersDelete);

module.exports = router;

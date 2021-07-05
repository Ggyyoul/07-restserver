const { Router } = require('express');
const { check } = require('express-validator');
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} = require('../controllers/users');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check(
      'password',
      'El password es obligatorio y tener mas de 6 letras'
    ).isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields,
  ],
  usersPost
);

router.delete('/', usersDelete);

module.exports = router;

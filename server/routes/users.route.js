const { Router } = require('express')
const { check } = require('express-validator')

const { register, login, meToken, userUpdate } = require('../controllers/users.controller')
const { emailExist, idUserExist, validRol } = require('../helpers/db-validators')
const validarCampos = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Is not a valid email').isEmail(),
    check('email').custom(emailExist),
    check('password', 'Password has to be at least 6 characters').isLength({ min: 6 }),
    check('rol').custom(validRol),
    validarCampos
], register)


router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validarCampos
], login)

// router.put('/profile/:id', [
//     check('id', 'Not a valid ID').isMongoId(),
//     check('id').custom(idUserExist),
//     validarCampos
// ], userUpdate)


router.get('/me', [
    validarJWT
], meToken);



module.exports = router
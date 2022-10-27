/*
    Rutas de Usuarios / Auth
    Base -> host + /api/auth
*/

const {  Router   } = require('express');
const {  check  } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
 
router.post(
    '/new',
    [// middlewares
        check('name','The name must contain five letters').not().isEmpty(),
        check('email','email required').isEmail(),
        check('password','Password most great 6 characters').isLength({ min:6 }),
        validarCampos
    ],
    createUser  );

router.post('/',
[// middlewares
    check('email','email required').isEmail(),
    check('password','Password most great 6 characters').isLength({  min:6  }),
    validarCampos
],loginUser);

router.get('/renew', validarJWT ,renewToken);



 module.exports = router;


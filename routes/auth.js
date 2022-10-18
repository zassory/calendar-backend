/*
    Rutas de Usuarios / Auth
    Base -> host + /api/auth
*/

const {  Router   } = require('express');
const {  check  } = require('express-validator');
const router = Router();

const { 
        createUser,
        loginUser,
        renewToken,
     } = require('../controllers/auth');
 
 
router.post(
    '/new',
    [// middlewares
        check('name','The name must contain five letters').not().isEmpty(),
        check('email','email required').isEmail(),
        check('password','Password most great 6 characters').isLength({ min:6   })
    ],
    createUser  );

router.post('/', loginUser);

router.get('/renew', renewToken);



 module.exports = router;


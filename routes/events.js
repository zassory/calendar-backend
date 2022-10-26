/*
    Rutas de Eventos / event
    Base -> host + /api/event
*/
const { Router } = require('express');
const {  check  } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents , createEvent , editEvent , deleteEvent } = require('../controllers/events');

const router = Router();

//*Le digo que cualquier peticion que se encuentre debajo de esto
//*Va a tener que tener su token
router.use( validarJWT ); //Aqui es donde agrega a mi
                         //peticion el jwt

router.get('/' , getEvents);

router.post('/',
[
    check('title','titulo debe ser obligatorio').not().isEmpty(),
    check('start','Fecha de fin debe ser una fecha valida').not().isEmpty(),
    check('start').custom( isDate ),
    check('end').not().isEmpty(),
    check('end').custom( isDate ),
    validarCampos
],
createEvent);

router.put('/:id', editEvent);

router.delete('/:id', deleteEvent);

module.exports = router;

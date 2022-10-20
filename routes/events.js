/*
    Rutas de Eventos / event
    Base -> host + /api/event
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents , createEvent , editEvent , deleteEvent } = require('../controllers/events');

const {  check  } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//*Le digo que cualquier peticion que se encuentre debajo de esto
//*Va a tener que tener su token
router.use( validarJWT );

router.get('/' , getEvents);

router.post('/', createEvent);

router.put('/:id', editEvent);

router.delete('/:id', deleteEvent);

module.exports = router;

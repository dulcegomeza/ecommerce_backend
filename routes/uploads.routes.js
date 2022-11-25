const { Router } = require('express');
const { body }   = require('express-validator');

const bodyParser = require('body-parser');
const { cargarArchivo } = require('../controllers/uploads.controllers');
const { validateFields } = require('../middlewares/validate-fields');
const jsonParser = bodyParser.json();
const router = Router();

router.post('/',  cargarArchivo );

module.exports = router;
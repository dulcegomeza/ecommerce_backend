const { Router } = require('express');
const { body }   = require('express-validator');

const bodyParser = require('body-parser');
const { login } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate-fields');
const jsonParser = bodyParser.json();
const router = Router();

router.post('/login', [ jsonParser,
    body('email','Email invalid').isEmail(),
    body('password', 'Password required').not().isEmpty(),
    validateFields], login );

module.exports = router;
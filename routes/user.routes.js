const { Router } = require('express');
const { body, check } = require('express-validator');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const { usersGet, usersPost, usersPut, usersDelete, usersGetById } = require('../controllers/user.controllers');

const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.get('/',  validateJWT,  usersGet);
router.get('/:id', [   
    validateJWT, 
    check('id','No Mongo id').isMongoId(), 
    validateFields
], usersGetById );

router.post('/',
    [
     jsonParser,
     body('email', 'Email invalid').isEmail(),
     body('name', 'Name is required').not().isEmpty(),
     body('lastName', 'last name is required').not().isEmpty(),
     body('password', 'Password must contain more than 6 characters').isLength({ min : 6}),
     validateFields
    ],
    usersPost);
router.put('/:id',[
    validateJWT,
    body('email', 'Email invalid').isEmail(),
    body('name', 'Name is required').not().isEmpty(),
    body('address', 'Country is required').not().isEmpty(),
    body('country', 'Country is required').not().isEmpty(),
    body('city', 'City is required').not().isEmpty(),
    body('state', 'State is required').not().isEmpty(),
    body('address', 'Address is required').not().isEmpty(),
    body('lastName', 'last name is required').not().isEmpty(),
    check('id','No Mongo id').isMongoId(), 
    jsonParser,
    validateFields
    ], usersPut);

router.delete('/:id', [
    validateJWT, 
    check('id','No Mongo id').isMongoId(), 
    validateFields], usersDelete);

module.exports = router;
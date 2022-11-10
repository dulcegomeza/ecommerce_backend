const { Router } = require('express');
const { body, check } = require('express-validator');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const { verifyUser, usersPost, usersPut, usersDelete, usersGetById } = require('../controllers/user.controllers');

const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.get('/',  validateJWT,  verifyUser);
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
    jsonParser,
    check('email', 'Email invalid').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('address', 'Country is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('lastName', 'last name is required').not().isEmpty(),
    check('id','No Mongo id').isMongoId(), 
    validateFields
    ], usersPut);

router.delete('/:id', [
    validateJWT, 
    check('id','No Mongo id').isMongoId(), 
    validateFields], usersDelete);

module.exports = router;
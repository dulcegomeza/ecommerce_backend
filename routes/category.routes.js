const { Router } = require('express');
const { body, check } = require('express-validator');
const bodyParser = require('body-parser');
const { validateFields, validateJWT } = require('../middlewares');
const { categoriesGet, categoriesPost, categoriesPut, categoriesDelete, categoriesGetById } = require('../controllers/category.controllers');
const  jsonParser = bodyParser.json();

const { categoryExists } = require('../helpers/validate-db');

const router = Router(); 

router.get('/', categoriesGet);

router.get('/:id', [    
    check('id','No Mongo id').isMongoId(), 
    check('id').custom(categoryExists),
    validateFields
], categoriesGetById);

router.post('/',[validateJWT,
    jsonParser,
    body('name', 'Name required').not().isEmpty(),
    validateFields], categoriesPost);

router.put('/:id',[validateJWT,  
     check('id','No Mongo id').isMongoId(),   
     check('id').custom(categoryExists), 
     jsonParser, 
    body('name', 'Name required').not().isEmpty(), 
    validateFields], categoriesPut);
router.delete('/:id', [validateJWT,  check('id','No Mongo id').isMongoId(),   check('id').custom(categoryExists), validateFields ], categoriesDelete);

module.exports = router;

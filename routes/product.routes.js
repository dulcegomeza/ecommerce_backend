const { Router } = require('express');
const { body, check } = require('express-validator');
const bodyParser = require('body-parser');
const { validateFields, validateJWT } = require('../middlewares');
const { productsGet, productsGetById, productsPost, productsPut, productsDelete } = require('../controllers/product.controllers');
const  jsonParser = bodyParser.json();

const { productExists, categoryExists } = require('../helpers/validate-db');

const router = Router(); 

router.get('/', productsGet);

router.get('/:id', [    
    check('id','No Mongo id').isMongoId(), 
    check('id').custom(productExists),
    validateFields
], productsGetById );

router.post('/',[validateJWT,
    jsonParser,
    body('name', 'Name required').not().isEmpty(),
    body('category', 'Category no mongo id').isMongoId(),
    check('category').custom(categoryExists),
    validateFields], productsPost);

router.put('/:id',[validateJWT,  
    jsonParser,
    check('id','No Mongo id').isMongoId(),   
    check('id').custom(productExists), 
    validateFields], productsPut);

router.delete('/:id', [
    validateJWT,  check('id','No Mongo id').isMongoId(),  
    check('id').custom(productExists), validateFields 
    ],
    productsDelete);

module.exports = router;

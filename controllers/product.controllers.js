
const { Product } = require('../models');

const productsGet = async(req, res) =>{

    const { desde = 0, limite = 8 } = req.query;

    const query = { status: true};

    const [ products, total ] = await Promise.all([
        Product.find(query)
        .populate('category', 'name')
        .skip(Number(desde)).limit(Number(limite)),
        Product.countDocuments(query)
    ])

    res.json({ products, total })
}


const productsGetById = async(req, res) =>{
    const { id } = req.params;
    const product = await Product.findById(id).populate('category','name');

    res.json(product);
}


const productsPost = async (req, res) =>{
   
    const {status,  name, ...resto} = req.body;

    const productDB = await Product.findOne({ name });

    if(productDB){
        return res.status(400).json({msg: `product ${name} exist`});
    }

    const data = {
        ...resto,
        name
    }

    const product = new Product(data);

    await product.save();

    res.status(201).json(product);

}


const productsPut = async(req, res) =>{
    const { id } = req.params;
    const {status,  ...data} = req.body;

    const product = await Product.findByIdAndUpdate(id, data);


    res.json({ 'msg': 'put', product })
}


const productsDelete = async (req, res) =>{
    const { id } = req.params;

    const  product = await Product.findByIdAndUpdate(id, { status :false, available: false });
    res.json({ 'msg': 'delete', product })
}

module.exports = {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete
}

const { Product } = require('../models');

const productsPaginadoPost = async(req, res) =>{

    const {category = '', desde = 0, limite = 9, pag=1 } = req.body;

    let page =pag;
    let query = { status: true};
    let page_next = 0;
    let page_afther  = 0;
    let desd = desde;
    
    if(category!=''){
        query = { status: true, category: category};
    }

    const total = await Product.countDocuments(query);

   /* const [ products, total ] = await Promise.all([
        Product.find(query)
        .populate('category', 'name')
        .skip(Number(desde)).limit(Number(limite)),
        Product.countDocuments(query)
    ])*/

   let  total_pages = Math.ceil(total / limite);

    if(page > total_pages){
        page = total_pages;
    }

    page-=1;
    desd = page * limite;
    if(desd < 0){
        desd = 0;
    }

    if(page >= total_pages -1){
        page_next = 1;
    }else{
        page_next = page + 2;
    }

    if(page <1){
        page_afther = total_pages;
    }else{
        page_afther = page;
    }


    const products = await  Product.find(query)
    .populate('category', 'name')
    .skip(Number(desd)).limit(Number(limite));

    const page_actual = page +1;

    res.json({ products, total, total_pages, page_actual, page_next, page_afther, desd })
}

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
    productsDelete,
    productsPaginadoPost
}
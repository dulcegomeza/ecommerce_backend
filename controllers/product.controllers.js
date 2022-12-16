const { Product } = require('../models');


const productsPaginadoPost = async(req, res) => {

    const { category = '', limit = 9, desde = 0, pag = 1 } = req.body;

    let page = pag;
    let query = { status: true };
    let from = desde;

    if (category != '') {
        query = { status: true, category: category };
    }

    const total = await Product.countDocuments(query);

    let total_pages = Math.ceil(total / limit);

    if (page > total_pages) {
        page = total_pages;
    }

    page = pag - 1;
    from = page * limit;

    if (from < 0) {
        from = 0;
    }


    const products = await Product.find(query)
        .populate('category', 'name')
        .skip(Number(from)).limit(Number(limit));


    res.json({ products, total, total_pages, limit, from })
}

const productsGet = async(req, res) => {

    const { from = 0, limit = 8 } = req.query;

    const query = { status: true };

    const [products, total] = await Promise.all([
        Product.find(query)
        .populate('category', 'name')
        .skip(Number(from)).limit(Number(limit)),
        Product.countDocuments(query)
    ])

    res.json({ products, total })
}


const productsGetById = async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category', 'name');

    res.json(product);
}


const productsPost = async(req, res) => {

    const { status, name, ...resto } = req.body;

    const productDB = await Product.findOne({ name });

    if (productDB) {
        return res.status(400).json({ msg: `product ${name} exist` });
    }

    const data = {
        ...resto,
        name
    }

    const product = new Product(data);

    await product.save();

    res.status(201).json(product);

}


const productsPut = async(req, res) => {
    const { id } = req.params;
    const { status, ...data } = req.body;

    const product = await Product.findByIdAndUpdate(id, data);


    res.json({ 'msg': 'put', product })
}


const productsDelete = async(req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, { status: false, available: false });
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
const { Product } = require('../models');

const productsPaginadoPost = async (req, res) => {

    const { category = '', limite = 9, search = '', desde = 0, pag = 1 } = req.body;

    let page = pag;
    let query = { status: true };
    let desd = desde;

    const regex = RegExp(search, 'i');

    if (category != '' && serch != '') {
        query = { status: true, category: category, name: regex };
    } else if (category != '') {
        query = { status: true, category: category };
    } else {
        query = { status: true }
    }


    const total = await Product.countDocuments({
        $or: [{ name: regex }, { category: category }],
        $and: [{ status: true }]
    });

    let total_pages = Math.ceil(total / limite);

    if (page > total_pages) {
        page = total_pages;
    }

    page = pag - 1;
    desd = page * limite;

    if (desd < 0) {
        desd = 0;
    }

    const products = await Product.find({
        $or: [{ name: regex }, { category: category }],
        $and: [{ status: true }]
    })
        .populate('category', 'name')
        .skip(Number(desd)).limit(Number(limite));

    const page_actual = page + 1;

    res.json({ products, total, total_pages, page_actual, limite, desd, regex, search })
}

const productsGet = async (req, res) => {

    const { desde = 0, limite = 8 } = req.query;

    const query = { status: true };

    const [products, total] = await Promise.all([
        Product.find(query)
            .populate('category', 'name')
            .skip(Number(desde)).limit(Number(limite)),
        Product.countDocuments(query)
    ])

    res.json({ products, total })
}


const productsGetById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category', 'name');

    res.json(product);
}


const productsPost = async (req, res) => {

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


const productsPut = async (req, res) => {
    const { id } = req.params;
    const { status, ...data } = req.body;

    const product = await Product.findByIdAndUpdate(id, data);


    res.json({ 'msg': 'put', product })
}


const productsDelete = async (req, res) => {
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
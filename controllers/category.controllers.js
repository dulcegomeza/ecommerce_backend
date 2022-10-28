
const { Categorie } = require('../models');

const categoriesGet = async(req, res) =>{

    const { desde = 0, limite = 5 } = req.query;

    const query = { status: true};

    const [ categories, total ] = await Promise.all([
        Categorie.find(query).populate('user', 'name').skip(Number(desde)).limit(Number(limite)),
        Categorie.countDocuments(query)
    ])

    res.json({ categories, total })
}


const categoriesGetById = async(req, res) =>{
    const { id } = req.params;
    const category = await Categorie.findById(id).populate('user','name');

    res.json(category);

}


const categoriesPost = async (req, res) =>{
   
    const {user, status, ...resto} = req.body;

    //validar que una categoria ya existe
    const categoryDB = await Categorie.findOne({ 'name':resto.name });

    if(categoryDB){
        return res.status(400).json({msg: `category ${ resto.name } exist`});
    }

    const data = {
        ...resto,
        user: req.user._id
    }

    const category = new Categorie(data);

    await category.save();

    res.status(201).json(category);

}


const categoriesPut = async(req, res) =>{
    const { id } = req.params;
    const {status, user, ...data} = req.body;

    data.user = req.user._id;

    const category = await Categorie.findByIdAndUpdate(id, data);


    res.json({ 'msg': 'put', category })
}


const categoriesDelete = async (req, res) =>{
    const { id } = req.params;

    const  category = await Categorie.findByIdAndUpdate(id, { status :false });
    res.json({ 'msg': 'delete', category })
}

module.exports = {
    categoriesGet,
    categoriesGetById,
    categoriesPost,
    categoriesPut,
    categoriesDelete
}
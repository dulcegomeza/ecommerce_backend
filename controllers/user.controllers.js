
const { User } = require('../models');
const bcryptjs = require('bcryptjs');



const usersGet = async (req, res) => {

    const { desde = 0, limite = 5 } = req.query;
    //Esto sirve para listar todos los usuarios: const users = await User.find();

    const query = { status: true};

    const [ users, total ] = await Promise.all([
        User.find(query).skip(Number(desde)).limit(Number(limite)),
        User.countDocuments(query)
    ])


    res.json({ users, total })
}

const usersPost = async (req, res) => {

    const user = new User(req.body);

    const existEmail = await User.findOne({ email: user.email });

    if (existEmail) {
        return res.status(400).json({
            'msg': 'Ese correo ya esta registrado'
        })
    }

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(user.password, salt);

    await user.save();

    res.json({
        'msg': 'post',
        user
    })
}

const usersPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, ...resto} = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password =  bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);


    res.json({ 'msg': 'put', user })
}

const usersDelete = async (req, res) => {
    const { id } = req.params;
   //  Esto sirve para eliminar un documento: const user = await User.findByIdAndDelete(id);

   const  user = await User.findByIdAndUpdate(id, { status :false });
    res.json({ 'msg': 'delete', user })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}
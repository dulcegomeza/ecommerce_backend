
const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const usersGetById = async(req, res) =>{
    const { id } = req.params;
    const user = await User.findById(id);

    res.json(user);
}


const verifyUser = async (req, res) => {

    const { user }  = req;

   const token = await generateJWT(user.uid)

    const userFound = {
        uid: user.id,
        name: user.name,
        lastName: user.lastName,
        address:user.address,
        city:user.city,
        state:user.state,
        cp:user.cp,
        country:user.country,
        email:user.email
      };

    res.json({ user:userFound, token })
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
    verifyUser,
    usersPost,
    usersPut,
    usersDelete,
    usersGetById
}
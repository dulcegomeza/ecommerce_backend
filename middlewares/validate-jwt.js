const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateJWT = async(req, res, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({ msg: 'not token' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRECT_JWT);

        const user = await User.findById(uid);

        //validamos que se encuentre el uid
        if(!user){
            return res.status(400).json({ msg: 'Token invalid - user not exist' });
        }
        //validamos que ese user este activo/status true
        if(!user.status){
            return res.status(400).json({ msg: 'Token invalid' });
        }

        req.user=user;
        next();
    } catch (error) {
        return res.status(400).json({ msg: 'token invalid' });
    }



}

module.exports = {
    validateJWT
}
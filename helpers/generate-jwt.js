const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign
            (
                payload, process.env.SECRECT_JWT, {
                expiresIn: '8h'
            }, (err, token) => {
                if (err) {
                    reject('token not generated');
                } else {
                    resolve(token);
                }
            }
            )
    })

}

module.exports = {
    generateJWT
}
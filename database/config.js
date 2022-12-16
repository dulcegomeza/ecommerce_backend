const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database online');
    } catch (error) {
        throw new Error('Error');
    }
}

module.exports = { dbConnection };
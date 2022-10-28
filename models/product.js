const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: ['name required']
    },
    status: {
        type: Boolean,
        default: true
    },
    imgsUrl: {
        type: Array,
        default: ''
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    available: {
        type: String,
        default: true
    }
})

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();

    return data;
}


module.exports = model('Product', ProductSchema);
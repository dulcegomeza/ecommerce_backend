const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: ['name required']
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    imgsUrl: {
        type: Array,
        default: ''
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
    discount:{
        type: Boolean,
        default: false
    },
    discount_percentage:{
        type: Number,
        default: 0
    }

})

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();

    return data;
}


module.exports = model('Product', ProductSchema);
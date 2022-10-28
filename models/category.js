const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required : [ 'name required']
    },
    status :{
        type: Boolean,
        default: true
    },
    imgUrl:{
        type: String,
        default: ''
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
})

CategorySchema.methods.toJSON = function (){
    const { __v, status, ...data } = this.toObject();
 
    return data;
}


module.exports = model('Categorie', CategorySchema);
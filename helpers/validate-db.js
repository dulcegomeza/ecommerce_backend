const { Categorie, Product } = require("../models")

const categoryExists = async(id) =>{
    const categoryExist = await Categorie.findById(id);
    if( !categoryExist){
        throw new Error(`Id not exists ${id}`);
    }

}

const productExists = async(id) =>{
    const productExist = await Product.findById(id);
    if( !productExist){
        throw new Error(`Id not exists ${id}`);
    }

}

module.exports = {
    categoryExists,
    productExists
}
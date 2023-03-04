const  mongoose = require("mongoose");
const Product = require("../models/product")


const getAllProducts = async (req, res) => {
    try{
        const allProducts = await Product.find({});
        return res.status(200).json(allProducts);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}
const getSingleProduct = async (req, res) => {
    try{
        const singleProduct = await Product.find(mongoose.Types.ObjectId(req.params.id));
        return res.status(200).json(singleProduct);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct
}
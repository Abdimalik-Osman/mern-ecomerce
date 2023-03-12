const  mongoose = require("mongoose");
// import Product from './../../frontend/src/components/Product';
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
// create a new product 
const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        if(!newProduct){
            return res.status(404).json({message: 'Product could not be created....'})
        }
        return res.status(200).json({message:"successfully created........."})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// delete product 
const deleteProduct = async(req,res)=>{
    try {
        const deleted = await Product.deleteOne(req.params.id);
        if(!deleted){
            return res.status(404).json({message:"an error occurred while deleting product..."});
        }
        return res.status(200).json({message:"successfully Deleted ..."});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    deleteProduct
}
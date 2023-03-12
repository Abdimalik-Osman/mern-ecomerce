import axios from "axios"

const url = "http://localhost:5000/api/products";
//get all products
const getAllProducts = async()=>{
   const response = await axios.get(url+"/all");
   return response.data
}


// create new product
const createProduct = async(product)=>{
    const response = await axios.post(url+"/add",product);
    return response.data;
}
// delete new product
const deleteProduct = async(id)=>{
    const response = await axios.delete(url+`:${$id}`);
    return response.data;
}
const productService = {
    getAllProducts,
    deleteProduct,
    createProduct
}
export default productService

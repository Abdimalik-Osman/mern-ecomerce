require("dotenv").config()
const productData =require("./data/product");
const connectDB = require("./config/db");

const Product = require("./models/product");

connectDB()
const importData = async()=>{
    try{
        await Product.deleteMany({});

        await Product.insertMany(productData);

        console.log("product imported successfully");
        process.exit(1);
    }catch(err){
        console.log("error with data import.....");
        process.exit(1)
    }
}
importData();
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log("CONNECTED TO DB SUCCESSFULLY")
    }catch(err){
        console.log("connection failed");
        process.exit(1)
    }
}
module.exports = connectDB
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db")
const productsRoutes = require("./routes/productsRoutes")
connectDB()
const app = express();
const port = 5000;
app.use(express.json());
app.use("/api/products",productsRoutes)
app.listen(port,()=>{
    console.log("Server is running on port: ",port)
})
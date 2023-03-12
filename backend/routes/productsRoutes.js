const express = require('express');
const productsController = require("../controllers/productsController")
const router = express.Router();

// @desc GET all products
// @route GET /api/products
// @access public
router.get("/all",productsController.getAllProducts)


// @desc POST a products by id from db
// @route GET /api/products/:id
// @access public
router.get("/:id",productsController.getSingleProduct)
// @desc POST create product
// @route POST /api/products/add
// @access public
router.get("/add",productsController.createProduct)

// @desc DELETE products 
// @route DELETE /api/products/:id
// @access public
router.get("/:id",productsController.deleteProduct);

module.exports = router;
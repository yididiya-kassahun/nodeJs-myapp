const express = require("express");

const adminData = require("./admin");
const shopController = require("../controllers/shopController");
const router = express.Router();

router.get("/", shopController.getProducts);

router.get("/cart", shopController.getCart);

router.get("/checkout", shopController.getcheckout);

router.get("/products", shopController.getUserProducts);

router.get("/product/:productId", shopController.getProductDetail);

router.get("/product-list", shopController.getAllProducts);

module.exports = router;

const express = require("express");

const adminController = require("../controllers/adminController");
const isAuth = require('../middleware/is-Auth');

const router = express.Router();

router.get("/admin/add-product",isAuth, adminController.getAddProduct);

router.post("/admin/add-product", isAuth,adminController.postAddProduct);

router.get("/admin/products", isAuth, adminController.getAdminProducts);

router.post("/admin/edit-product",isAuth, adminController.postEditProduct);

router.get("/admin/edit-product/:productId",isAuth, adminController.getEditProduct);

router.post('/admin/delete-product/:productId',isAuth, adminController.postDeleteProduct);


//router.get("/products", adminController.getAllProducts);

module.exports = router;

const Product = require("../models/productModel");

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageURL: imageUrl,
      description: description,
    })
    .then((result) => {
      console.log("Product created successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });

  // const product = new Product(title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "add product page",
    path: "admin/add-product",
    editing: false,
    isAuthenticated: req.isLoggedIn,
  });
};

exports.getAdminProducts = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin product page",
      path: "/",
      isAuthenticated: req.isLoggedIn,
    });
    console.log(req.user);
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  //console.log(editMode);

  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "admin edit page",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageURL = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageURL = updatedImageURL;
      product.description = updatedDesc;
      product.save();
    })
    .then((result) => {
      console.log("product updated successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      product.destroy();
    })
    .then((result) => {
      console.log("Deleted successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

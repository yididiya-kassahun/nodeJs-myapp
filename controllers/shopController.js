const Product = require("../models/productModel");

exports.getProducts = (req, res, next) => {
  res.render("shop/products", {
    pageTitle: "Product Page",
    message: "page",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll()
    .then((products) => {
      res.render("shop/product-detail", {
        prods: products,
        pageTitle: "Product detail Page",
        message: prodId,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cartProducts) => {
      // console.log(cart);
      return cartProducts
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            pageTitle: "Product Cart Page",
            message: "cart page",
            products: products,
            isAuthenticated: req.session.isLoggedIn,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
      }
      // ************** Time = 3:49
      return Product.findByPk(
        prodId
          .then((product) => {
            return fetchedCart.addProduct(product, {
              through: { quantity: newQuantity },
            });
          })
          .catch((err) => {
            console.log(err);
          })
      );
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getcheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "checkout page",
    message: "Checkout page",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getUserProducts = (req, res, next) => {
  res.render("shop/products", {
    pageTitle: "user product page",
    message: "User Product page",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getAllProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "My Shop page",
      path: "/",
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};

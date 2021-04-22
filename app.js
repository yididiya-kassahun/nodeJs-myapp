const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/errorController");
const session = require("express-session");
const MysqlStore = require("express-mysql-session")(session);
const csurf = require('csurf');
const flash = require('connect-flash');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const path = require("path");
const sequelize = require("./utils/database");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const CartItem = require("./models/cart-item");

const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");

const app = express();
const store = new MysqlStore({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "node_db",
});

const csurfProtection = csurf();
app.use(flash());

// Setup View template engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
// join stylesheet with system root path
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csurfProtection);

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});


// Set Routing
app.use(adminData);
app.use(shopRouter);
app.use(authRouter);

// Relationship
Product.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

app.use(errorController.Page404);

// Using sequelizer for ORM database - mysql
sequelize
  // .sync({ force: true }) override the existing table
  .sync()
  .then((result) => {
    app.listen(3000);
    return User;
  })
  .catch((err) => {
    console.log(err);
  });

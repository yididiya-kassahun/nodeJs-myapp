exports.Page404 = (req, res, next) => {
    res
      .status(404)
      .render("404", {
        pageTitle: "Page NOT Found",
        isAuthenticated: req.isLoggedIn,
      });
};
const apiRoutes = require("./api");

const init = server => {
  server.get("*", (req, res, next) => {
    console.log("Request was made to: " + req.originalUrl);
    return next();
  });

  server.use("/api", apiRoutes);
};

module.exports = {
  init
};

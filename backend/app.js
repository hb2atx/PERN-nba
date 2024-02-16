const express = require('express');
const { authenticateJWT } = require('./middleware/auth');


const cors = require("cors");
const app = express();
const { NotFoundError } = require("./expressError");


const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const avgRoutes = require("./routes/avg");
const playerRoutes = require("./routes/player");

app.use(express.json());
app.use(authenticateJWT);
app.use(cors());


app.use("/player", playerRoutes);
app.use("/avg", avgRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

///////////////////// Handle 404 errors, this matches everything ///////////////////////////////////

app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
  
  //////////////// Generic error handler; anything unhandled goes here //////////////////////////////

  app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

module.exports = app;
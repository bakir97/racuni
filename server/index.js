const express = require("express");
const app = express();
//Mongoose
const keys = require("./config/keys");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
mongoose.connect(keys.mongoDB).then(() => {
  console.log("connectovan");
});
//Models
require("./Models/Korisnik");
require("./Models/Capex");
require("./Models/Unosi");
//Passport
const passport = require("passport");
app.use(passport.initialize());
require("./config/passportConfig")(passport);
//BodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Routes
const Unosi = require("./Routes/Unosi");
app.use("/Unosi", Unosi);
const Capex = require("./Routes/Capex");
app.use("/Capex", Capex);
const signUp = require("./Routes/SignUp");
app.use("/signUp", signUp);
const LogIn = require("./Routes/LogIn");
app.use("/LogIn", LogIn);
//App routes
app.get("/", (req, res) => {
  res.send("alooo");
});
app.get(
  "/passport",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.send("radi passport");
  }
);
//Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening on port 5000!");
});

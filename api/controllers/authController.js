const jwt = require("jsonwebtoken");
const masterToken = require("../config/masterToken");
const express = require("express");
const app = express();
const User = require("../models/user");
const detectedError = require("./errorController");

app.set("masterKey", masterToken.masterKey);

const authUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.email, password: req.body.password }
    );
    if (user) {
      const payload = {
        check: true,
      };
      const token = jwt.sign(payload, app.get("masterKey"), {
        expiresIn: 1440,
      });

      res.status(200).send({ message: "Auth correcta", token: token });
    } else {
      res.json({ error: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    detectedError(error, res);
  }

  //return res.status(200).send({saludo: "hi!"});
};

module.exports = {
  authUser,
};

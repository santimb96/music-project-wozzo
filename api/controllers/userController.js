const User = require("../models/user");
const detectedError = require("./errorController");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const masterToken = require("../config/masterToken");

const app = express();
app.set("masterKey", masterToken.masterKey);

const getAll = async (req, res) => {
  try {
    const users = await User.find({}); //.populate('userRoleId', 'name -_id').select('name email password userRoleId');
    res.status(200).send({ users });
  } catch (err) {
    console.error(err);
  }
};

const findId = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }); //.populate('userRoleId', 'name -_id').select('name email password userRoleId');
    return res.status(200).send({ user });
  } catch (err) {
    detectedError(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    return res
      .status(200)
      .send({ message: `Usuario actualizado: ${JSON.stringify(req.body)}` });
  } catch (err) {
    detectedError(err, res);
  }
};

const create = async (req, res) => {
  try {
    const userToCreate = req.body;
    // firmar la contraseña con salt de 10
    const salt = await bcrypt.genSalt(10);

    userToCreate.password = await bcrypt.hash(userToCreate.password, salt);

    await User.create(userToCreate);
    return res
      .status(200)
      .send({
        message: `Usuario creado: ${JSON.stringify(userToCreate.name)}`,
      });
  } catch (err) {
    res.status(500).send({ error: "No se ha podido postear usuario" });
  }
};

const deleteById = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ message: `Usuario borrado con id: ${req.params.id}` });
  } catch (err) {
    detectedError(err, res);
  }
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    detectedError({ message: "Wrong params sent" }, res);
  } else {
    // buscar el usuario
    // comparar contraseñas con bcrypt
    // si es ok, firmar jwt
    // devolver user, userRole, jwt y expiryDate
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const validPass = await bcrypt.compare(req.body.password, user.password);

      if (validPass) {
        const payload = {
          check: true,
        };
        const expiryDate = {
          expiresIn: 1440,
        };
        const token = jwt.sign(payload, app.get("masterKey"), expiryDate);

        res
          .status(200)
          .send({
            user: user.name,
            role: user.userRoleId,
            token: token,
            expiryDate: expiryDate.expiresIn,
          });
          
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      res.status(401).json({ error: "Invalid user" });
    }
  }
};

module.exports = {
  getAll,
  findId,
  updateById,
  create,
  deleteById,
  login,
};

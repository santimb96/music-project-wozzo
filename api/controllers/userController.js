import User from '../models/user.js';
import handleError from './errorController.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { masterToken } from '../config/masterToken.js';
import { EXPIRE_DATE } from '../constants.js';
import { format } from 'date-fns';
import sendEmail from './mailController.js';

const app = express();
app.set('masterKey', masterToken);

const getAll = async (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch(() =>
      handleError(404, 'No se ha podido obtener ningún usuario', res)
    );
};

const findId = async (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) =>
      user
        ? res.status(200).send({ user })
        : handleError(404, 'Usuario no encontrado', res)
    )
    .catch(() => handleError(404, 'Usuario no encontrado', res));
};

const updateById = async (req, res) => {
  const userToUpdate = req.body;
  if (req.body.password) {
    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash(userToUpdate.password, salt).then((hashedPaswd) => {
        userToUpdate.password = hashedPaswd;
        User.findOneAndUpdate({ _id: req.params.id }, userToUpdate)
          .then((user) =>
            res
              .status(201)
              .send({ status: 201, message: `${user.name} actualizado` })
          )
          .catch(() => handleError(404, 'Usuario no encontrado', res));
      });
    });
  } else {
    User.findOneAndUpdate({ _id: req.params.id }, userToUpdate)
      .then((user) =>
        res
          .status(201)
          .send({ status: 201, message: `${user.name} actualizado` })
      )
      .catch(() => handleError(404, 'Usuario no encontrado', res));
  }
};

const findByEmail = async (userEmail) =>
  new Promise((resolve, reject) => {
    User.findOne({ email: userEmail }).then((user) => {
      if(user){
        reject(user);
      } else {
        resolve();
      }
    });
  });

const create = async (req, res) => {
  const userToCreate = req.body;
  findByEmail(userToCreate?.email)
    .then(() => {
      bcrypt
        .genSalt(10)
        .then((salt) => {
          bcrypt.hash(userToCreate.password, salt).then((hashedPaswd) => {
            userToCreate.password = hashedPaswd;
            sendEmail(userToCreate)
              .then(() => {
                User.create(userToCreate).then((userCreated) => {
                  return res.status(201).send({
                    status: 201,
                    message: `${userCreated.name} ha sido cread@`,
                  });
                });
              })
              .catch(() =>
                handleError(500, 'No se ha podido mandar mail', res)
              );
          });
        })
        .catch(() => handleError(400.3, 'No se ha podido crear al usuario', res));
    })
    .catch(() => handleError(400.3, 'Email repetido', res));
};

const deleteById = async (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then(() =>
      res
        .status(200)
        .send({ status: 200, message: 'Registro borrado con éxito!' })
    )
    .catch(() => handleError(404, 'Usuario no encontrado', res));
};

const login = (req, res) => {
  //console.log(req.body.password);
  if (!req.body.email || !req.body.password) {
    handleError(400.1, 'Parámetros incorrectos', res);
  } else {
    // buscar el usuario
    // comparar contraseñas con bcrypt
    // si es ok, firmar jwt
    // devolver user, userRole, jwt y expiryDate
    User.findOne({ email: req.body.email })
      .populate('userRoleId')
      .then((user) => {
        bcrypt
          .compare(req.body.password, user.password)
          .then((pass) => {
            if (pass) {
              delete user._doc.password;
              const token = jwt.sign({ user }, app.get('masterKey'), {
                expiresIn: EXPIRE_DATE,
              });
              const expDate = new Date(Date.now() + 3600 * 1000 * 24);

              res.status(200).send({
                user,
                role: user.userRoleId.name,
                token: token,
                expiryDate: format(expDate, 'dd/MM/yyyy HH:mm'),
              });
            } else {
              handleError(401.1, 'Contraseña incorrecta', res);
            }
          })
          .catch(() => handleError(404, 'Usuario no encontrado', res));
      })
      .catch(() => handleError(404, 'Usuario no encontrado', res));
  }
};

const autoLogin = (req, res) => {
  // {id: id, token: token}
  User.findOne({ _id: req.body.id })
    .populate('userRoleId')
    .then((user) => {
      if (user) {
        delete user._doc.password;
        res.status(200).send({ user });
      } else {
        handleError(404, 'Usuario no encontrado', res);
      }
    })
    .catch(() => handleError(404, 'Usuario no encontrado', res));
};

const updateProfile = (req, res) => {
  const userToUpdate = req.body;
  if (req.body.password) {
    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash(userToUpdate.password, salt).then((hashedPaswd) => {
        userToUpdate.password = hashedPaswd;
        User.findOneAndUpdate({ _id: req.params.id }, userToUpdate)
          .then((user) =>
            res
              .status(201)
              .send({ status: 201, message: `${user.name} actualizado` })
          )
          .catch(() => handleError(404, 'Usuario no encontrado', res));
      });
    });
  } else {
    User.findOneAndUpdate({ _id: req.params.id }, userToUpdate)
      .then((user) =>
        res
          .status(201)
          .send({ status: 201, message: `${user.name} actualizado` })
      )
      .catch(() => handleError(404, 'Usuario no encontrado', res));
  }
};

export default {
  getAll,
  findId,
  updateById,
  create,
  deleteById,
  login,
  autoLogin,
  updateProfile,
};

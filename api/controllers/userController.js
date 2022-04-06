import User from '../models/user.js';
import handleError from './errorController.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { masterToken } from '../config/masterToken.js';
import { EXPIRE_DATE } from '../constants.js';
import { format } from 'date-fns';

const app = express();
app.set('masterKey', masterToken);

const getAll = async (req, res) => {
  User.find({})
    .then(users => res.status(200).send({ users }))
    .catch(() => handleError(404, 'No se ha podido obtener ningún usuario', res));
};

const findId = async (req, res) => {
  User.findOne({_id: req.params.id})
    .then(user => user
      ? res.status(200).send({ user })
      : handleError(404, 'Usuario no encontrado', res))
    .catch(() => handleError(404, 'Usuario no encontrado', res));
};

const updateById = async (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id },req.body)
    .then(user => res
      .status(201)
      .send({ status: 201, message: `${user.name} actualizado` }))
    .catch(() => handleError(404, 'Usuario no encontrado', res)
    );
};

const create = async (req, res) => { 
  const userToCreate = req.body;
  bcrypt.genSalt(10).then(salt => {
    bcrypt.hash(userToCreate.password, salt).then(hashedPaswd => {
      userToCreate.password = hashedPaswd;
      User.create(userToCreate).then((userCreated) => { 
        return res.status(201).send({ status: 201, message: `${userCreated.name} ha sido cread@`,}
        );
      });
    });
  });
};

const deleteById = async (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then(() => res
      .status(200)
      .send({ status: 200, message: 'Registro borrado con éxito!' }))
    .catch(()=>  handleError(404, 'Usuario no encontrado', res));
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
        if (user) {
          bcrypt
            .compare(req.body.password, user.password)
            .then((pass) => {
              if (pass) {
                const token = jwt.sign({ user }, app.get('masterKey'), {
                  expiresIn: EXPIRE_DATE,
                });
                const expDate = new Date(Date.now() + (3600 * 1000 * 24));
                res.status(200).send({
                  user: user.name,
                  role: user.userRoleId,
                  token: token,
                  expiryDate: format(expDate, 'dd/MM/yyyy HH:mm'),
                });
              } else {
                handleError(401.1, 'Contraseña incorrecta', res);
              }
            })
            .catch(() => handleError(404, 'Usuario no encontrado', res));
        }
      })
      .catch(() => {
        handleError(404, 'Usuario no encontrado', res);
      });
  }
};

export default {
  getAll,
  findId,
  updateById,
  create,
  deleteById,
  login,
};

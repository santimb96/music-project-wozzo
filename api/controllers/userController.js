import User from '../models/user.js';
import handleError from './errorController.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { masterToken } from '../config/masterToken.js';
import { EXPIRE_DATE } from '../constants.js';
import dayjs from 'dayjs';

const app = express();
app.set('masterKey', masterToken);

const getAll = async (req, res) => {
  try {
    const users = await User.find({}); //.populate('userRoleId', 'name -_id').select('name email password userRoleId');
    res.status(200).send({ users });
  } catch (err) {
    handleError(404, 'No se ha podido obtener ningún usuario', res);
  }
};

const findId = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    user
      ? res.status(200).send({ user })
      : handleError(404, 'Usuario no encontrado', res);
  } catch (err) {
    handleError(404, 'Usuario no encontrado', res);
  }
};

const updateById = async (req, res) => {
  try {
    const update = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    return res
      .status(200)
      .send({ status: 200, message: `${update.name} actualizado` });
  } catch (err) {
    handleError(404, 'Usuario no encontrado', res);
  }
};

const create = async (req, res) => {
  
  const userToCreate = req.body;
  bcrypt.genSalt(10).then(salt => {
    bcrypt.hash(userToCreate.password, salt).then(hashedPaswd => {
      userToCreate.password = hashedPaswd;
      User.create(userToCreate).then((userCreated) => { 
        return res.status(200).send({
          message: `${userCreated.name} ha sido cread@`,
        });
      });
    });
  });
};

const deleteById = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ status: 200, message: 'Registro borrado con éxito!' });
  } catch (err) {
    handleError(404, 'Usuario no encontrado', res);
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    handleError(400.1, 'Parámetros incorrectos', res);
  } else {
    // buscar el usuario
    // comparar contraseñas con bcrypt
    // si es ok, firmar jwt
    // devolver user, userRole, jwt y expiryDate
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          bcrypt
            .compare(req.body.password, user.password)
            .then((pass) => {
              if (pass) {
                const token = jwt.sign({ user }, app.get('masterKey'), {
                  expiresIn: EXPIRE_DATE,
                });
                res.status(200).send({
                  user: user.name,
                  role: user.userRoleId,
                  token: token,
                  expiryDate: dayjs().format('DD/MM/YYYY hh:mm A'),
                });
              } else {
                handleError(401.1, 'Contraseña incorrecta', res);
              }
            })
            .catch(() => handleError(404, 'Usuario no encontrado', res));
        }
      })
      .catch(() => {
        handleError(404, 'Usuario no encontrado', res); // todo fill
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

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
  try {
    const userToCreate = req.body;
    // firmar la contraseña con salt de 10
    const salt = await bcrypt.genSalt(10);

    userToCreate.password = await bcrypt.hash(userToCreate.password, salt);

    await User.create(userToCreate);
    return res.status(200).send({
      message: `${userToCreate.name} ha sido cread@`,
    });
  } catch (err) {
    handleError(401, 'No se ha podido postear usuario', res);
  }
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

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    handleError({ message: 'Wrong params sent' }, res);
  } else {
    // buscar el usuario
    // comparar contraseñas con bcrypt
    // si es ok, firmar jwt
    // devolver user, userRole, jwt y expiryDate

    const user = await User.findOne({ email: req.body.email }).catch((err) =>
      console.warn(err)
    );

    if (user) {
      const validPass = await bcrypt
        .compare(req.body.password, user.password)
        .catch((err) => console.warn(err));

      if (validPass) {
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
    } else {
      handleError(404, 'Usuario no encontrado', res);
    }
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

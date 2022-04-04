import User from '../models/user.js';
import detectedError  from './errorController.js';
import express from 'express';
import jwt  from 'jsonwebtoken';
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
    res.status(500).send({ error: 'No se ha podido postear usuario' });
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
    detectedError({ message: 'Wrong params sent' }, res);
  } else {
    // buscar el usuario
    // comparar contraseñas con bcrypt
    // si es ok, firmar jwt
    // devolver user, userRole, jwt y expiryDate
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const validPass = await bcrypt.compare(req.body.password, user.password);

      if (validPass) {
        const token = jwt.sign({user}, app.get('masterKey'), { expiresIn: EXPIRE_DATE });
        res
          .status(200)
          .send({
            user: user.name,
            role: user.userRoleId,
            token: token,
            expiryDate: dayjs().format('DD/MM/YYYY hh:mm')
            // todo format 
          });

      } else {
        //handleError(401.1, 'Invalid email or password');
        res.status(401).json({ error: 'Invalid password' });
      }
    } else {
      //handleError(404, 'No user found');
      res.status(401).json({ error: 'no user user' });
    }
  }
};

export default{
  getAll,
  findId,
  updateById,
  create,
  deleteById,
  login,
};

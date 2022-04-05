import UserRole from '../models/userRole.js';
import handleError from './errorController.js';

const getAll = async (req, res) => {
  UserRole.find({})
    .then(userRoles => res.status(200).send({userRoles}))
    .catch(() => handleError(404, 'Roles no encontrados', res));
};

const findId = async (req, res) => {
  UserRole.findOne({ _id: req.params.id })
    .then(userRole => userRole ? res.status(200).send({ userRole }):handleError(404, 'Rol no encontrado', res))
    .catch(() => handleError(404, 'Rol no encontrado', res));
};

export default{
  getAll,
  findId,
};

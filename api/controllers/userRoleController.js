import UserRole from '../models/userRole.js';
import handleError from './errorController.js';

const getAll = async (req, res) => {
  try {
    const userRoles = await UserRole.find({});
    res.status(200).send({userRoles});    
  } catch (err) {
    handleError(err, 'Roles no encontrados', res);
  }
};

const findId = async (req, res) => {
  try {
    const userRole = await UserRole.findOne({ _id: req.params.id });
    userRole ? res.status(200).send({ userRole }):handleError(404, 'Rol no encontrado', res); 
  } catch (err) {
    handleError(404, 'Rol no encontrado', res);
  }
};

export default{
  getAll,
  findId,
  // updateById,
  // create,
  // deleteById,
};

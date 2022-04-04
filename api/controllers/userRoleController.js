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

// const updateById = async (req, res) => {
//   try {
//     await UserRole.findOneAndUpdate({ _id: req.params.id }, req.body);
//     return res
//       .status(200)
//       .send({ message: `Rol de usuario actualizado: ${JSON.stringify(req.body)}` });
//   } catch (err) {
//     detectedError(err, res);
//   }
// };

// const create = async (req, res) => {
//   try {
//     let insert = {};
//     insert = req.body;
//     await UserRole.create(insert);
//     return res
//       .status(200)
//       .send({ message: `Rol de usuario creado: ${JSON.stringify(insert.name)}` });
//   } catch (err) {
//     res.status(500).send({ error: "No se ha podido postear Rol de usuario" });
//   }
// };

// const deleteById = async (req, res) => {
//   try {
//     await UserRole.deleteOne({ _id: req.params.id });
//     return res
//       .status(200)
//       .send({ message: `Rol de usuario borrado con id: ${req.params.id}` });
//   } catch (err) {
//     detectedError(err, res);
//   }
// };

export default{
  getAll,
  findId,
  // updateById,
  // create,
  // deleteById,
};

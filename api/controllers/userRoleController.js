const UserRole = require("../models/userRole");

const detectedError = (err, res) => {
  if (err?.message) {
    return res.status(404).send({ error: err?.message });
  }
  return res.status(404).send({ error: "No encontrado" });
};

const getAll = async (req, res) => {
  try {
    const userRoles = await UserRole.find({});
    res.status(200).send({userRoles});    
  } catch (err) {
    console.error(err);
  }
};

const findId = async (req, res) => {
  try {
    const userRole = await UserRole.findOne({ name: req.params.name });
    return res.status(200).send({ userRole });
  } catch (err) {
    detectedError(err, res);
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

module.exports = {
  getAll,
  findId,
  // updateById,
  // create,
  // deleteById,
};

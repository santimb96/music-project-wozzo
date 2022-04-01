const User = require("../models/user");
const detectedError  = require("./errorController");


const getAll = async (req, res) => {
  try {
    const users = await User.find({})//.populate('userRoleId', 'name -_id').select('name email password userRoleId');
    res.status(200).send({ users });
  } catch (err) {
    console.error(err);
  }
};

const findId = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })//.populate('userRoleId', 'name -_id').select('name email password userRoleId');
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
    let insert = {};
    insert = req.body;
    await User.create(insert);
    return res
      .status(200)
      .send({ message: `Usuario creado: ${JSON.stringify(insert.name)}` });
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

module.exports = {
  getAll,
  findId,
  updateById,
  create,
  deleteById,
};

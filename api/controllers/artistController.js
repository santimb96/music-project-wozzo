const Artist = require("../models/artist");

const detectedError = (err, res) => {
  if (err?.message) {
    return res.status(404).send({ error: err?.message });
  }
  return res.status(404).send({ error: "No encontrado" });
};

const getAll = async (req, res) => {
  try {
    const artists = await Artist.find({});
    res.status(200).send({artists});    
  } catch (err) {
    console.error(err);
  }
};


const findId = async (req, res) => {
  try {
    const artist = await Artist.findOne({ _id: req.params.id });
    return res.status(200).send({ artist });
  } catch (err) {
    detectedError(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    await Artist.findOneAndUpdate({ _id: req.params.id }, req.body);
    return res
      .status(200)
      .send({ message: `Artista actualizado: ${JSON.stringify(req.body)}` });
  } catch (err) {
    detectedError(err, res);
  }
};

const create = async (req, res) => {
  try {
    let insert = {};
    insert = req.body;
    await Artist.create(insert);
    return res
      .status(200)
      .send({ message: `Artista creado: ${JSON.stringify(insert.name)}` });
  } catch (err) {
    res.status(500).send({ error: "No se ha podido postear Artista" });
  }
};

const deleteById = async (req, res) => {
  try {
    await Artist.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ message: `Artista borrado con id: ${req.params.id}` });
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

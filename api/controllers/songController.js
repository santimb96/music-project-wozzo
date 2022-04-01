const Song = require("../models/song");
const detectedError  = require("./errorController");


const getAll = async (req, res) => {
  try {
    const songs = await Song.find({})//.populate('artistId', 'name -_id').select('name audioUrl artistId');
    res.status(200).send({songs});    
  } catch (err) {
    console.error(err);
  }
};

const findId = async (req, res) => {
  try {
    const song = await Song.findOne({ _id: req.params.id })//.populate('artistId', 'name -_id').select('name audioUrl artistId');
    return res.status(200).send({ song });
  } catch (err) {
    detectedError(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    await Song.findOneAndUpdate({ _id: req.params.id }, req.body);
    return res
      .status(200)
      .send({ message: `Canción actualizado: ${JSON.stringify(req.body)}` });
  } catch (err) {
    detectedError(err, res);
  }
};

const create = async (req, res) => {
  try {
    let insert = {};
    insert = req.body;
    await Song.create(insert);
    return res
      .status(200)
      .send({ message: `Canción creado: ${JSON.stringify(insert.name)}` });
  } catch (err) {
    res.status(500).send({ error: "No se ha podido postear Canción" });
  }
};

const deleteById = async (req, res) => {
  try {
    await Song.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ message: `Canción borrado con id: ${req.params.id}` });
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

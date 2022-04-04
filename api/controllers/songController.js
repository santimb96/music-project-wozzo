import Song from '../models/song.js';
import handleError from './errorController.js';

const getAll = async (req, res) => {
  try {
    const songs = await Song.find({});//.populate('artistId', 'name -_id').select('name audioUrl artistId');
    res.status(200).send({songs});    
  } catch (err) {
    handleError(err, 'Canciones no encontradas', res);
  }
};

const findId = async (req, res) => {
  try {
    const song = await Song.findOne({ _id: req.params.id });//.populate('artistId', 'name -_id').select('name audioUrl artistId');
    return res.status(200).send({ song });
  } catch (err) {
    handleError(err, 'Canción no encontrada', res);
  }
};

const updateById = async (req, res) => {
  try {
    await Song.findOneAndUpdate({ _id: req.params.id }, req.body);
    return res
      .status(200)
      .send({ message: `Canción actualizado: ${JSON.stringify(req.body)}` });
  } catch (err) {
    handleError(err, 'No se ha podido actualizar la canción', res);
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
    handleError(err, 'No se ha podido postear la canción', res);
  }
};

const deleteById = async (req, res) => {
  try {
    await Song.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ message: `Canción borrado con id: ${req.params.id}` });
  } catch (err) {
    handleError(err, 'No se ha podido borrar la canciñon', res);
  }
};

export default {
  getAll,
  findId,
  updateById,
  create,
  deleteById,
};

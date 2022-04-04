import Song from '../models/song.js';
import handleError from './errorController.js';

const getAll = async (req, res) => {
  try {
    const songs = await Song.find({});
    res.status(200).send({songs});    
  } catch (err) {
    handleError(err, 'Canciones no encontradas', res);
  }
};

const findId = async (req, res) => {
  try {
    const song = await Song.findOne({ _id: req.params.id });
    song? res.status(200).send({ song }): handleError(404, 'Canción no encontrada', res);
  } catch (err) {
    handleError(404, 'Canción no encontrada', res);
  }
};
const updateById = async (req, res) => {
  try{
    const song = await Song.findOneAndUpdate({ _id: req.params.id }, req.body);
    return res
      .status(200)
      .send({ message: `${song.name} se ha actualizado` });
  } catch (err) {
    handleError(404, 'No se ha podido actualizar la canción', res);
  }
};

const create = async (req, res) => {
  try {
    const songToCreate = req.body;
    await Song.create(songToCreate);
    return res
      .status(200)
      .send({ message: `${songToCreate.name} ha sido cread@` });
  } catch (err) {
    handleError(401, 'No se ha podido postear la canción', res);
  }
};

const deleteById = async (req, res) => {
  try {
    await Song.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ status: 200, message: 'Registro borrado con éxito!' });      
  } catch (err) {
    handleError(404, 'No se ha podido borrar la canciñon', res);
  }
};

export default {
  getAll,
  findId,
  updateById,
  create,
  deleteById,
};

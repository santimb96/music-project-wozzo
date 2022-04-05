import Song from '../models/song.js';
import handleError from './errorController.js';

const getAll = async (req, res) => {
  Song.find({})
    .then(songs => res.status(200).send({songs}))
    .catch(() => handleError(404, 'Canciones no encontradas', res));
};

const findId = async (req, res) => {
  Song.findOne({ _id: req.params.id })
    .then(song => song? res.status(200).send({ song }): handleError(404, 'Canción no encontrada', res))
    .catch (() =>handleError(404, 'Canción no encontrada', res));
};
const updateById = async (req, res) => {
  Song.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(song => res
      .status(200)
      .send({ message: `${song.name} se ha actualizado` }))
    .catch(() => handleError(404, 'No se ha podido actualizar la canción', res));
};

const create = async (req, res) => {
  const songToCreate = req.body;

  Song.create(songToCreate)
    .then(song => res
      .status(200)
      .send({ message: `${song.name} ha sido cread@` }))
    .catch(() => handleError(401, 'No se ha podido postear la canción', res));
};

const deleteById = async (req, res) => {
  Song.findOneAndDelete({ _id: req.params.id })
    .then(() => res
      .status(200)
      .send({ status: 200, message: 'Registro borrado con éxito!' }))
    .catch(() => handleError(404, 'No se ha podido borrar la canciñon', res));
};

export default {
  getAll,
  findId,
  updateById,
  create,
  deleteById,
};

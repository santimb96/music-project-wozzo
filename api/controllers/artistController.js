import Artist from '../models/artist.js';
import Song from '../models/song.js';
import handleError from './errorController.js';

const getAll = async (req, res) => {
  Artist.find({})
    .then(artists => res.status(200).send({artists})
    )
    .catch(() => handleError(404, 'No se ha podido obtener la lista de artistas', res));
};

const findId = async (req, res) => {
  Artist.findOne({ _id: req.params.id })
    .then(artist => artist? res.status(200).send({ artist }): handleError(404, 'No se ha podido obtener al artista', res))
    .catch(() => handleError(404, 'No se ha podido obtener al artista', res));
};

const updateById = async (req, res) => {
  Artist.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(artist => res
      .status(201)
      .send({status: 201, message: `${artist.name} ha sido actualizad@` }))
    .catch(()=>  handleError(404, 'Artista no encontrado', res));
};

const create = async (req, res) => {
  const artistToCreate = req.body;
  Artist.create(artistToCreate)
    .then(artist => res
      .status(201)
      .send({ status: 201, message: `Se ha creado a ${artist.name}` }))
    .catch( () =>  handleError(401, 'No se ha podido postear al artista', res));
};

const deleteById = async (req, res) => {
  Artist.findOneAndDelete({ _id: req.params.id })
    .then(() => Song.findOneAndDelete({ artistId: req.params.id }))
    .then(() => res
      .status(200)
      .send({ status: 200, message: 'Registros borrados con éxito!' }))
    .catch(() => handleError(404, 'No se ha podido borrar al artista', res));
};

export default{
  getAll,
  findId,
  updateById,
  create,
  deleteById,
};

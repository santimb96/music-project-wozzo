import Artist from '../models/artist.js';
import Song from '../models/song.js';
import handleError from './errorController.js';

const getAll = async (req, res) => {
  try {
    const artists = await Artist.find({});
    res.status(200).send({artists});    
  } catch (err) {
    handleError(404, 'No se ha podido obtener la lista de artistas', res);
  }
};

const findId = async (req, res) => {
  try {
    const artist = await Artist.findOne({ _id: req.params.id });
    if(artist){
      return res.status(200).send({ artist });
    }
    handleError(404, 'No se ha podido obtener al artista', res);
  } catch (err) {
    handleError(404, 'No se ha podido obtener al artista', res);
  }
};

const updateById = async (req, res) => {
  try {
    const update = await Artist.findOneAndUpdate({_id: req.params.id}, req.body);
    return res
      .status(200)
      .send({status: 200, message: `${update.name} ha sido actualizad@` });
  } catch (err) {
    handleError(404, 'Artista no encontrado', res);
  }
};

const create = async (req, res) => {
  try {
    const artistToCreate = req.body;
    await Artist.create(artistToCreate);
    return res
      .status(200)
      .send({ status: 200, message: `Se ha creado a ${artistToCreate.name}` });
  } catch (err) {
    handleError(401, 'No se ha podido postear al artista', res);
  }
};

const deleteById = async (req, res) => {
  try {
    await Artist.deleteOne({ _id: req.params.id });
    await Song.deleteOne({ artistId: req.params.id }); 
    return res
      .status(200)
      .send({ status: 200, message: 'Registro borrado con éxito!' });
  } catch (err) {
    handleError(404, 'No se ha podido borrar al artista', res);
  }
};

export default{
  getAll,
  findId,
  updateById,
  create,
  deleteById,
};

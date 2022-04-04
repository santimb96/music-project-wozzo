import Artist from '../models/artist.js';
import Song from '../models/song.js';
import handleError from './errorController.js';

const getAll = async (req, res) => {
  try {
    const artists = await Artist.find({});
    res.status(200).send({artists});    
  } catch (err) {
    handleError(err, 'No se ha podido obtener la lista de artistas', res);
  }
};

const findId = async (req, res) => {
  try {
    const artist = await Artist.findOne({ _id: req.params.id });
    return res.status(200).send({ artist });
  } catch (err) {
    handleError(err, 'No se ha podido obtener al artista', res);
  }
};

const updateById = async (req, res) => {
  try {
    await Artist.findOneAndUpdate({ _id: req.params.id }, req.body);
    return res
      .status(200)
      .send({ message: `Artista actualizado: ${JSON.stringify(req.body)}` });
  } catch (err) {
    handleError(err, 'No se ha podido actualizar al artista', res);
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
    handleError(err, 'No se ha podido postear al artista', res);
  }
};

const deleteById = async (req, res) => {
  try {
    await Artist.deleteOne({ _id: req.params.id });
    await Song.deleteOne({ artistId: req.params.id }); 
    return res
      .status(200)
      .send({ message: `Artista borrado con id: ${req.params.id}` });
  } catch (err) {
    handleError(err, 'No se ha podido borrar al artista', res);
  }
};

export default{
  getAll,
  findId,
  updateById,
  create,
  deleteById,
};

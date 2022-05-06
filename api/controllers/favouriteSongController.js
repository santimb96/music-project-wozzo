import FavouriteSong from '../models/favouriteSong.js';
import handleError from './errorController.js';

const getAll = async (req, res) => {
  FavouriteSong.find({})
    .then((favouriteSong) => res.status(200).send({ favouriteSong }))
    .catch(() =>
      handleError(404, 'No se ha podido obtener ningún usuario', res)
    );
};

const create = async (req, res) => {
  const FavouriteSongToCreate = req.body;
  FavouriteSong.create(FavouriteSongToCreate)
    .then(favouriteSong => res
      .status(201)
      .send({ status: 201, message: `Se ha creado a ${favouriteSong._id}` }))
    .catch(() =>  handleError(401, 'No se ha podido postear el favorito', res));
};

const deleteById = async (req, res) => {
  FavouriteSong.findOneAndDelete({ _id: req.params.id })
    .then(() => res
      .status(200)
      .send({ status: 200, message: 'Registro borrados con éxito!' }))
    .catch(() => handleError(404, 'No se ha podido borrar el favorito', res));
};
const updateById = async (req, res) => {
  FavouriteSong.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(favouriteSong => res
      .status(201)
      .send({status: 201, message: `${favouriteSong._id} ha sido actualizad@` }))
    .catch(()=>  handleError(404, 'Artista no encontrado', res));
};
 


export default {
  getAll,
  create,
  deleteById,
  updateById
};
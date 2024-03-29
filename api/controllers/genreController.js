import Genre from '../models/genre.js';
import handleError from './errorController.js';
import getDataFromAws from './awsController.js';


const getAll = async (req, res) => {
  Genre.find({})
    .then(genres => res.status(200).send({genres}))
    .catch(() => handleError(404, 'No se ha podido obtener la lista de géneros', res));
};

const findId = async (req, res) => {
  Genre.findOne({ _id: req.params.id })
    .then(genre => genre? res.status(200).send({ genre }): handleError(404, 'No se ha podido obtener al género', res))
    .catch(() => handleError(404, 'No se ha podido obtener al Genrea', res));
};

const updateById = async (req, res) => {
  const genreToUpdate = req.body;

  if(req.file){
    getDataFromAws(req, 'genreImg/')
      .then(data => {
        const locationUrl = data.Location;
        let newGenreToUpdate = { ...genreToUpdate, genreImg: locationUrl };
        Genre.findOneAndUpdate({ _id: req.params.id }, newGenreToUpdate)
          .then(genre => res
            .status(201)
            .send({ status: 201, message: `${genre.name} se ha actualizado` }))
          .catch(() => handleError(404, 'No se ha podido actualizar el género', res));
      })
      .catch(() => handleError(404, 'No se ha podido actualizar la imagen', res));
  } else {
    Genre.findOneAndUpdate({_id: req.params.id}, req.body)
      .then(genre => res
        .status(201)
        .send({status: 201, message: `${genre.name} ha sido actualizad@` }))
      .catch(()=>  handleError(404, 'Género no encontrado', res));
  }
};

const create = async (req, res) => {
  const GenreToCreate = req.body;
  getDataFromAws(req, 'genreImg/')
    .then(data => {
      const locationUrl = data.Location;
      let newGenreToCreate = { ...GenreToCreate, genreImg: locationUrl };
      Genre.create(newGenreToCreate)
        .then(genre => res
          .status(201)
          .send({ status: 201, message: `Se ha creado a ${genre.name}` }))
        .catch(() =>  handleError(401, 'No se ha podido postear el género', res));
    })
    .catch(() => handleError(404, 'No se ha podido subir la imagen', res));

  
};

const deleteById = async (req, res) => {
  Genre.findOneAndDelete({ _id: req.params.id })
    .then(() => res
      .status(200)
      .send({ status: 200, message: 'Registros borrado con éxito!' }))
    .catch(() => handleError(404, 'No se ha podido borrar al género', res));
};



export default{
  getAll,
  findId,
  updateById,
  create,
  deleteById
};

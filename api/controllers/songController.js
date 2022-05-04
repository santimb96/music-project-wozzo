import Song from '../models/song.js';
import handleError from './errorController.js';
import getDataFromAws from './awsController.js';

// import aws from 'aws-sdk';
// import fs from 'fs';

// import * as dotenv from 'dotenv';
// import process from 'process';

// dotenv.config();

const getAll = async (req, res) => {
  Song.find({})
    .then((songs) => res.status(200).send({ songs }))
    .catch(() => handleError(404, 'Canciones no encontradas', res));
};

const findId = async (req, res) => {
  Song.findOne({ _id: req.params.id })
    .then((song) =>
      song
        ? res.status(200).send({ song })
        : handleError(404, 'Canción no encontrada', res)
    )
    .catch(() => handleError(404, 'Canción no encontrada', res));
};
const updateById = async (req, res) => {
  
  const songToUpdate = req.body;
  console.log(req.body);


  if(req.file){
    getDataFromAws(req)
      .then((data) => {
        const locationUrl = data.Location;
        let newSongToUpdate = { ...songToUpdate, audioUrl: locationUrl };

        songToUpdate.audioUrl = locationUrl;

        Song.findOneAndUpdate({ _id: req.params.id }, newSongToUpdate)
          .then((song) =>
            res
              .status(201)
              .send({ status: 201, message: `${song.name} se ha actualizado` })
          )
          .catch(() =>
            handleError(404, 'No se ha podido actualizar la canción', res)
          );
      })
      .catch(() => handleError(404, 'No se ha podido actualizar la canción', res));
  } else {
    Song.findOneAndUpdate({ _id: req.params.id }, songToUpdate)
      .then((song) =>
        res
          .status(201)
          .send({ status: 201, message: `${song.name} se ha actualizado` })
      )
      .catch(() =>
        handleError(404, 'No se ha podido actualizar la canción', res)
      );
  }
};

const create = async (req, res) => {
  const songToCreate = req.body;
  getDataFromAws(req)
    .then((data) => {
      const locationUrl = data.Location;
      let newSong = new Song({ ...songToCreate, audioUrl: locationUrl });

      Song.create(newSong)
        .then((song) =>
          res
            .status(201)
            .send({ status: 201, message: `${song.name} ha sido cread@` })
        )
        .catch(() =>
          handleError(401, 'No se ha podido postear la canción', res)
        );
    })
    .catch(() => handleError(404, 'No se ha podido subir la canción', res));
};

const deleteById = async (req, res) => {
  Song.findOneAndDelete({ _id: req.params.id })
    .then(() =>
      res
        .status(200)
        .send({ status: 200, message: 'Registro borrado con éxito!' })
    )
    .catch(() => handleError(404, 'No se ha podido borrar la canciñon', res));
};

const findByName = (req, res) => {
  Song.findOne({ name: req.params.name })
    .then((song) =>
      song
        ? res.status(200).send({ song })
        : handleError(404, 'No se ha podido obtener la canción', res)
    )
    .catch(() => handleError(404, 'No se ha podido obtener la canción', res));
};

export default {
  getAll,
  findId,
  updateById,
  create,
  deleteById,
  findByName,
};

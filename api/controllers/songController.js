import Song from '../models/song.js';
import handleError from './errorController.js';

import aws from 'aws-sdk';
import fs from 'fs';

import * as dotenv from 'dotenv';
import process from 'process';

dotenv.config();


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
      .status(201)
      .send({ status: 201, message: `${song.name} se ha actualizado` }))
    .catch(() => handleError(404, 'No se ha podido actualizar la canción', res));
};

const create = async (req, res) => {

  const songToCreate = req.body;

  console.warn(process.env.ACCESS_KEY_PRIVATE);
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_KEY_PRIVATE,
  });

  const s3 = new aws.S3();
  const params = {
    Bucket: process.env.BUCKET,
    Body: fs.createReadStream(req.file.path),
    Key: `song/${req.file.originalname}`,
    CacheControl: 'public'
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error occured while trying to upload to S3 bucket', err);
    }
    fs.unlinkSync(req.file.path); // Empty temp folder
    

    
    if(data){
      const locationUrl = data.Location;
      let newSong = new Song({...songToCreate, audioUrl: locationUrl });

      Song.create(newSong)
        .then(song => res
          .status(201)
          .send({status: 201, message: `${song.name} ha sido cread@` }))
        .catch(() => handleError(401, 'No se ha podido postear la canción', res));
    }
  });
};

const deleteById = async (req, res) => {
  Song.findOneAndDelete({ _id: req.params.id })
    .then(() => res
      .status(200)
      .send({ status: 200, message: 'Registro borrado con éxito!' }))
    .catch(() => handleError(404, 'No se ha podido borrar la canciñon', res));
};

const findByName = (req, res) => {
  Song.findOne({ name: req.params.name })
    .then(song => song? res.status(200).send({ song }): handleError(404, 'No se ha podido obtener la canción', res))
    .catch(() => handleError(404, 'No se ha podido obtener la canción', res));
};

export default {
  getAll,
  findId,
  updateById,
  create,
  deleteById,
  findByName
};

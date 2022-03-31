const Song = require("../models/song");


const getAll = async (req, res) => {
  try {
    const songs = await Song.find({});
    res.status(200).send({songs});    
  } catch (err) {
    console.error(err);
  }
};

//const getOne = async (req, res)

module.exports = {
  getAll,
};

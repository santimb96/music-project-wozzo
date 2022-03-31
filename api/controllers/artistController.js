const Artist = require("../models/artist");


const getAll = async (req, res) => {
  try {
    const artists = await Artist.find({});
    res.status(200).send({artists});    
  } catch (err) {
    console.error(err);
  }
};

//const getOne = async (req, res)

module.exports = {
  getAll,
};

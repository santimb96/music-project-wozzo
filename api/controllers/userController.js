const User = require("../models/user");
//const UserRole = require("../models/userRole");

const getAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({users});    
  } catch (err) {
    console.error(err);
  }
};

//const getOne = async (req, res)

module.exports = {
  getAll,
};

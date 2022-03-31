const UserRole = require("../models/userRole");
//const UserRole = require("../models/userRole");

const getAll = async (req, res) => {
  try {
    const userRoles = await UserRole.find({});
    res.status(200).send({userRoles});    
  } catch (err) {
    console.error(err);
  }
};

//const getOne = async (req, res)

module.exports = {
  getAll,
};

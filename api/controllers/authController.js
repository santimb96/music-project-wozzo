const jwt = require("jsonwebtoken");
const masterToken = require("../config/masterToken");
const express = require("express");
const app = express();

app.set("masterKey", masterToken.masterKey);

const authUser = (req, res) => {
    return res.status(200).send({saludo: "hi!"});
}

module.exports = {
    authUser
};
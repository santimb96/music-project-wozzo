const express = require('express');
const userRoleController = require('../controllers/userRoleController');

const router = express.Router();

router.get('/', userRoleController.getAll);

module.exports = router;
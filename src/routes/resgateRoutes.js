const express = require('express');
const router = express.Router();
const resgateController = require('../controllers/resgateController');

router.post('/', resgateController.realizarResgate);

module.exports = router;

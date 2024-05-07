const express = require('express');
const router = express.Router();
const aporteController = require('../controllers/aporteController');

router.post('/', aporteController.realizarAporte);

module.exports = router;

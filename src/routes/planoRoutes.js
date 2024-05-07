const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');

router.post('/', planoController.cadastrarPlano);

module.exports = router;

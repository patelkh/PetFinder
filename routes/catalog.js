const express = require('express');
const router = express.Router();

const dog_controller = require('../controllers/dogController');
const location_controller = require('../controllers/locationController');
const shelter_controller = require('../controllers/shelterController');


router.get("/pet/create", dog_controller.create_dog);

module.exports = router
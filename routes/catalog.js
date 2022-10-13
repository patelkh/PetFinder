const express = require('express');
const router = express.Router();

const dog_controller = require('../controllers/dogController');
const location_controller = require('../controllers/locationController');
const shelter_controller = require('../controllers/shelterController');

router.get("/", dog_controller.index);
router.get("/about", dog_controller.about);

module.exports = router
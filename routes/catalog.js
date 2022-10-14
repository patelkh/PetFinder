const express = require('express');
const router = express.Router();

const dog_controller = require('../controllers/dogController');
const location_controller = require('../controllers/locationController');
const shelter_controller = require('../controllers/shelterController');

router.get("/", dog_controller.index);
router.get("/about", dog_controller.about);
router.get("/create_dog", dog_controller.create_dog);
router.post("/create_dog", dog_controller.update_dog_post);
router.post("/delete_dog", dog_controller.delete_dog_post);
router.post("/edit_dog", dog_controller.update_dog);
router.post("/edit_dog_post", dog_controller.update_dog_post);

module.exports = router
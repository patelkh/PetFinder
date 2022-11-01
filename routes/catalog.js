const express = require('express');
const router = express.Router();
const multer = require('multer')
const load = multer(({dest: "./uploads"}))
const pet_controller = require('../controllers/petController');


router.get("/", pet_controller.index);
router.get("/about", pet_controller.about);
router.get("/create_pet", pet_controller.create_pet);
router.post("/create_pet", load.single('image'), pet_controller.update_pet_post);
router.post("/delete_pet", pet_controller.delete_pet_post);
router.post("/edit_pet", pet_controller.update_pet);
router.post("/edit_pet_save", pet_controller.update_pet_save);
router.post("/search", pet_controller.search_pet);

module.exports = router
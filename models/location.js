const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    state: {type: String, required: true},
});


//compile schema to model
let Location = mongoose.model('Location', LocationSchema, )


module.exports = Location;
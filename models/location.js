const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    state: {type: String, required: true},
    country: {type: String},
    postal_code: {type: Number}
});


//compile schema to model
let Location = mongoose.model('Location', LocationSchema, )


module.exports = mongoose.model("Location", LocationSchema)
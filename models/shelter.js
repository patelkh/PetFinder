const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
    name: {type: String, required: true},
    location: {type: Schema.Types.ObjectId, ref: "Location"}
});


//compile schema to model
let Shelter = mongoose.model('Shelter', ShelterSchema, )


module.exports = mongoose.model("Shelter", ShelterSchema)
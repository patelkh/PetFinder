const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = new Schema({
    petImage: {
        data: Buffer,
        contentType: String,
    },
    name: {type: String, required: true, maxLength: 25},
    age: {type: Number},
    type: {type: String},
    breed: {type: String},
    gender: {type: String, required: true},
    size: {type: String},
    entry_date: {type: Date, required: true},
    location: {type: String},
    shelter: {type: String}
});

PetSchema.virtual("url").get(function(){
    return `/catalog`
})

//compile schema to mode
let Pet = mongoose.model('Pet', PetSchema)


module.exports = Pet;
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DogSchema = new Schema({
    name: {type: String, required: true, maxLength: 25},
    age: {type: Number},
    breed: {type: String},
    gender: {type: String, required: true},
    size: {type: String},
    entry_date: {type: Date, required: true},
    location: {type: Schema.Types.ObjectId, ref: "Location"},
    shelter: {type: Schema.Types.ObjectId, ref: "Shelter"}
});

DogSchema.virtual("url").get(function(){
    return `/catalog`
})

//compile schema to mode
let Dog = mongoose.model('Dog', DogSchema)


module.exports = mongoose.model("Dog", DogSchema)
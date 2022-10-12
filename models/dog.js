const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DogSchema = new Schema({
    name: {type: String, required: true, maxLength: 25},
    age: {type: Number},
    breed: {type: String},
    gender: {type: String, required: true},
    size: {type: String},
    entry_date: {type: Date},
});

DogSchema.virtual("url").get(function(){
    return `/catalog/pet/${this._id}`
})

//compile schema to model
let Dog = mongoose.model('Dog', DogSchema, )


module.exports = mongoose.model("Dog", DogSchema)
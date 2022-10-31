const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    type: {type: String}
});

TypeSchema.virtual("url").get(function(){
    return `/catalog`
})

//compile schema to mode
let Type = mongoose.model('Type', TypeSchema)


module.exports = Type;
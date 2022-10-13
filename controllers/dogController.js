const Dog = require('../models/dog');
const Location = require('../models/location');
const Shelter = require('../models/shelter');

const async = require('async');

exports.index = function(req, res, next) {
    Dog.find({}, "name age breed gender size entry_date location shelter")
    .sort({age:1})
    .exec(function (err, list_dogs){
        if(err) return next(err)
        res.render("layout", {title: "PetFinder", dog_list: list_dogs})
    })
}

exports.about = (req, res) => {
    res.render("about");
}

exports.create_dog = (req, res) => {
    res.send(`NOT IMPLEMENTED YET!`)
}

exports.delete_dog_get = (req, res) => {
    res.send(`NOT IMPLEMENTED YET!`)
}

exports.delete_dog_post = (req, res) => {
    res.send(`NOT IMPLEMENTED YET!`)
}

exports.update_dog_get = (req, res) => {
    res.send(`NOT IMPLEMENTED YET!`)
}

exports.update_dog_post = (req, res) => {
    res.send(`NOT IMPLEMENTED YET!`)
}
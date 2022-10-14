
const Dog = require('../models/dog');
const Location = require('../models/location');
const Shelter = require('../models/shelter');
const expressValidator = require("express-validator");
const body = expressValidator.body;
const validationResult = expressValidator.validationResult;

const async = require('async');
const e = require('express');
const stringHex = require('string-hex');
const { default: mongoose } = require('mongoose');
const moment = require('moment');

exports.index = function(req, res, next) {
    Dog.find({}, "name age breed gender size entry_date location shelter")
    .sort({age:1})
    .exec(function (err, list_dogs){ //list_dogs aka results
        if(err) return next(err)
        res.render("layout", {title: "PetFinder", dog_list: list_dogs})
    })
}

exports.about = (req, res) => {
    res.render("about");
}

exports.create_dog = (req, res, next) => {
    async.parallel(
        {
            locations(callback) {
                Location.find(callback)
            },
            shelters(callback) {
                Shelter.find(callback)
            },
        },
        (err, results) => {
            if(err) {
                console.log(error)
                return next(err)
            }
            res.render("addForm", {
                title: "Add Pet",
                locations: results.locations,
                shelters: results.shelters,
            })
        }
    )
}

exports.delete_dog_post = (req, res, next) => {
    console.log(req.body)
    Dog.findByIdAndRemove(req.body.dogid, (err) => {
        if(err) {
            return next(err)
        }
        console.log('dog deleted')
        res.redirect("/")
    })
}

exports.update_dog = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.body.dogid)
    async.parallel(
        {
            dog(callback) {
                Dog.findById(id)
                .exec(callback)
            },
        },
        (err, results) => {
            if(err) {
                console.log(err)
                return next(err)
            }
            console.log(`entry_date: ${moment(results.dog.entry_date).format('YYYY-MM-DD')}`);
            res.render("EditForm", {
                title: "Edit Pet",
                dog: results.dog,
                entry_date: moment(results.dog.entry_date).format("YYYY-MM-DD")
            })
        }
    )
}

exports.update_dog_post = (req, res, next) => {
    const dog = new Dog({
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        gender: req.body.gender,
        size: req.body.size,
        entry_date: req.body.entry_date,
    })
    dog.save((err)=> {
        if(err) {
            console.log(err)
            return next(err)
        } else {
            console.log(dog)
            res.redirect("/")
        }
    })
}
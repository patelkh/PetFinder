
const Pet = require('../models/pet');
const Location = require('../models/location');
const Shelter = require('../models/shelter');
const Type = require('../models/petType');
const expressValidator = require("express-validator");
const body = expressValidator.body;
const validationResult = expressValidator.validationResult;
const fs = require('fs')

const async = require('async');
const e = require('express');
const stringHex = require('string-hex');
const { default: mongoose } = require('mongoose');
const moment = require('moment');

//"name age breed gender size entry_date location shelter"
//returns dog records to be displayed on the home page
exports.index = function(req, res, next) {
    Pet.find({})
    .sort({name:1})
    .sort({age:1})
    .exec(function (err, list_pets){ //list_dogs aka results
        if(err) return next(err)
        res.render("layout", {title: "PetFinder", pet_list: list_pets})
    })
}

//returns the about page
exports.about = (req, res) => {
    res.render("about");
}

//passes locations and shelters to the add form 
exports.create_pet = (req, res, next) => {
    async.parallel(
        {
            locations(callback) {
                Location.find(callback)
            },
            shelters(callback) {
                Shelter.find(callback)
            },
            types(callback) {
                Type.find(callback)
            }

        },
        (err, results) => {
            if(err) {
                console.log(error)
                return next(err)
            }
            res.render("addForm", {
                title: "Add Pet",
                types: results.types,
                locations: results.locations,
                shelters: results.shelters,
            })
        }
    )
}

//deletes record from database
exports.delete_pet_post = (req, res, next) => {
    console.log(req.body)
    Pet.findByIdAndRemove(req.body.petid, (err) => {
        if(err) {
            return next(err)
        }
        console.log('pet deleted')
        res.redirect("/")
    })
}

//records data to be edited
exports.update_pet = (req, res, next) => {
    console.log(req.body.petid)
    const id = mongoose.Types.ObjectId(req.body.petid)
    console.log(id)
    async.parallel(
        {
            pet(callback) {
                Pet.findById(id)
                .exec(callback)
            },
        },
        (err, results) => {
            if(err) {
                console.log(err)
                return next(err)
            }
            console.log(`entry_date: ${moment(results.pet.entry_date).format('YYYY-MM-DD')}`);
            res.render("editForm", {
                title: "Edit Pet",
                pet: results.pet,
                entry_date: moment(results.pet.entry_date).format("YYYY-MM-DD"),
                _id: id
            })
        }
    )
}

//saves edited data 
exports.update_pet_save = (req, res, next) => {
    console.log(req.body)
    Pet.findByIdAndUpdate(req.body.id, 
        {
            name: req.body.name,
            age: req.body.age,
            breed: req.body.breed,
            gender: req.body.gender,
            size: req.body.size,
            entry_date: req.body.entry_date
        },
        (err) => {
            if(err) {
                return next(err)
            } else {
                
                res.redirect("/")
            }
        }
    )
}

//Adds a new record into the database from the Add page
exports.update_pet_post = (req, res, next) => {
    console.log(req.file.path)
    const dog = new Pet({
        petImage: {
            data: fs.readFileSync(req.file.path),
            contentType: "image/png",
        },
        name: req.body.name,
        age: req.body.age,
        type: req.body.type,
        breed: req.body.breed,
        gender: req.body.gender,
        size: req.body.size,
        entry_date: req.body.entry_date,
        location: req.body.location,
        shelter: req.body.shelter
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


exports.search_pet = (req, res, next) => {
    Pet.find({name: req.body.name})
    .exec(function (err, list_pets){ //list_dogs aka results
        if(err) return next(err)
        res.render("layout", {title: "PetFinder", pet_list: list_pets})
    })
}
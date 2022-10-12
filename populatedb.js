#! /usr/bin/env node

console.log('This script populates some test pet, location and shelter to your database. Specified database as argument - e.g.: mongodb+srv://admin:1234@petfinder.xwxdrcq.mongodb.net/PetFinder?retryWrites=true&w=majority');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Dog = require('./models/dog')
var Location = require('./models/location')
var Shelter = require('./models/shelter')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var dogs = []
var locations = []
var shelters = []


function dogCreate(name, age, breed, gender, size, entry_date, location, shelter, callback) {
  dogdetail = {name: name,
    age:age,
    breed:breed,
    gender:gender,
    size: size,
    entry_date: entry_date,
    location: location,
    shelter: shelter}

  var dog = new Dog(dogdetail);
       
  dog.save(function (err) {
    if (err) {
      callback(err, null)
      return
    }
    console.log('New dog: ' + dog);
    dogs.push(dog)
    callback(null, dog)
  }  );
}

function locationCreate(state, country, postal_code, callback) {
  
    locationdetail = {
    state:state,
    country:country,
    postal_code:postal_code
    }

    var location = new Location(locationdetail);
       
  location.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('New location: ' + location);
    locations.push(location)
    callback(null, location);
  }   );
}

function shelterCreate(name, location, callback) {
  shelterdetail = { 
    name: name,
    location: location
  }

  var shelter = new Shelter(shelterdetail);    
  shelter.save(function (err) {
    if (err) {
      callback(err, null)
      return
    }
    console.log('New shelter: ' + shelter);
    shelters.push(shelter)
    callback(null, shelter)
  }  );
}


function createLocations(callback) {
    async.series([
        function(callback) {
          locationCreate('California', 'Los Angeles', 90010, callback);
        },
        function(callback) {
            locationCreate('Texas', 'Dallas', 75201, callback);
        },
        function(callback) {
            locationCreate('Illinois', 'Chicago', 60601, callback);
        },
        function(callback) {
            locationCreate('Florida', 'Tampa', 33602, callback);
        },
        ],callback);
}

function createShelters(callback) {
    async.series([
        function(callback) {
            shelterCreate('Harbor Animal Shelter', locations[0], callback)
        },
        function(callback) {
            shelterCreate('The Poodle Patch & Friends', locations[1], callback)
        },
        function(callback) {
            shelterCreate('Marshall Animal Shelter', locations[2], callback)
        },
        function(callback) {
            shelterCreate('Connolly Animal Rescue', locations[3], callback)
        },
        function(callback) {
            shelterCreate('Los Angeles Animal Shelter', locations[1], callback)
        },
    ],callback)
}

function createDogs(callback) {
    async.parallel([
        function(callback) {
          dogCreate('Milo', 2, 'Border Colie', 'Male', 'Medium', Date.now(), locations[0], shelters[0], callback);
        },
        function(callback) {
            dogCreate('Luna', 3, 'Boxer', 'Female', 'Medium', Date.now(), locations[1], shelters[1], callback);
        },
        function(callback) {
            dogCreate('Angle', 4, 'German Shepard', 'Female', 'Large', Date.now(), locations[0], shelters[0], callback);
        },
        function(callback) {
            dogCreate('Barbi', 1, 'Yellow Lab', 'Female', 'Small', Date.now(), locations[0], shelters[0], callback);
        },
          function(callback) {
              dogCreate('Coco', 9, 'Mix', 'Male', 'Medium', Date.now(), locations[0], shelters[0], callback);
        },
          function(callback) {
              dogCreate('Bruno', 4, 'Doberman', 'Male', 'Large', Date.now(), locations[1], shelters[1], callback);
        },], callback);
}

async.series([
    createLocations,
    createShelters,
    createDogs,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Dogs: '+ dogs);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




#! /usr/bin/env node

console.log(
  "This script populates some test pet, location and shelter to your database. Specified database as argument - e.g.: mongodb+srv://admin:1234@petfinder.xwxdrcq.mongodb.net/PetFinder?retryWrites=true&w=majority"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var PetType = require("./models/petType");
var Location = require("./models/location");
var Shelter = require("./models/shelter");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var types = [];
var locations = [];
var shelters = [];


function typeCreate(type, callback) {
  var pettype = new PetType({ type: type });
  pettype.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log("New pet type: " + pettype);
    types.push(pettype);
    callback(null, pettype);
  });
}

function locationCreate(state, callback) {
  locationdetail = {
    state: state,
  };

  var location = new Location(locationdetail);

  location.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log("New location: " + location);
    locations.push(location);
    callback(null, location);
  });
}

function shelterCreate(name, location, callback) {
  shelterdetail = {
    name: name,
    location: location
  };

  var shelter = new Shelter(shelterdetail);
  shelter.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log("New shelter: " + shelter);
    shelters.push(shelter);
    callback(null, shelter);
  });
}

function createType(callback) {
  async.series([
    function(callback) {
      typeCreate("Canine", callback)
    },
    function(callback) {
      typeCreate("Feline", callback)
    },
    function(callback) {
      typeCreate("Other", callback)
    }
  ], callback)
}

function createLocations(callback) {
  async.series(
    [
      function (callback) {
        locationCreate("California",  callback);
      },
      function (callback) {
        locationCreate("Texas", callback);
      },
      function (callback) {
        locationCreate("Illinois", callback);
      },
      function (callback) {
        locationCreate("Florida",callback);
      },
    ],
    callback
  );
}

function createShelters(callback) {
  async.series(
    [
      function (callback) {
        shelterCreate("Harbor Animal Shelter", locations[0], callback);
      },
      function (callback) {
        shelterCreate("The Poodle Patch & Friends", locations[1], callback);
      },
      function (callback) {
        shelterCreate("Marshall Animal Shelter", locations[2], callback);
      },
      function (callback) {
        shelterCreate("Connolly Animal Rescue", locations[3], callback);
      },
      function (callback) {
        shelterCreate("Los Angeles Animal Shelter", locations[1], callback);
      },
    ],
    callback
  );
}

async.series(
  [createLocations, createShelters, createType],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Records created successfully");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

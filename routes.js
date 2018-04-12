var promise = require('bluebird');
var request = require("request");
var hospitals = require("./hospitals");


var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);


function getHospitals(req, res, next) {
  var location=[req.body.lat, req.body.lng];
  var pagetoken=req.query.pagetoken;


  hospitals.hospitalsSP(location, pagetoken).then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err.message);
    });
 
  
}


module.exports = {
  getHospitals: getHospitals
};
